"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSession } from "../lib/auth/auth-server";
import prisma from "../lib/prisma";
import { PeriodType } from "@prisma/client";

// Schema for purchase validation
const PurchaseSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

type PurchaseInput = z.infer<typeof PurchaseSchema>;

// Function to create a purchase
export async function createPurchase(data: PurchaseInput) {
  try {
    const user = await getSession();
    if (!user) {
      return { error: "You must be logged in to make a purchase." };
    }

    // Validate input
    const validatedData = PurchaseSchema.parse(data);

    // Get the product
    const product = await prisma.product.findUnique({
      where: {
        id: validatedData.productId,
        organizationId: user.orgId,
      },
    });

    if (!product) {
      return { error: "Product not found." };
    }

    // Check if enough stock is available
    if (product.stock < validatedData.quantity) {
      return {
        error: `Not enough stock. Only ${product.stock} units available.`,
      };
    }

    // Calculate sale details
    const unitPrice = product.sellingPrice;
    const totalAmount = unitPrice * validatedData.quantity;
    const taxAmount = totalAmount * (product.taxRate / 100);
    const profit = (unitPrice - product.costPrice) * validatedData.quantity;

    // Start a transaction to ensure all operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update product stock and total sold
      const updatedProduct = await tx.product.update({
        where: { id: product.id },
        data: {
          stock: { decrement: validatedData.quantity },
          totalSold: { increment: validatedData.quantity },
        },
      });

      // 2. Create a sale record
      const sale = await tx.sale.create({
        data: {
          productId: product.id,
          organizationId: user.orgId,
          quantity: validatedData.quantity,
          unitPrice,
          totalAmount,
          taxAmount,
          profit,
          saleDate: new Date(),
        },
      });

      // 3. Update or create daily sales aggregate
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      await tx.salesAggregate.upsert({
        where: {
          productId_periodType_periodStart: {
            productId: product.id,
            periodType: PeriodType.DAY,
            periodStart: today,
          },
        },
        update: {
          totalQuantity: { increment: validatedData.quantity },
          totalRevenue: { increment: totalAmount },
          totalProfit: { increment: profit },
          lastUpdated: new Date(),
        },
        create: {
          productId: product.id,
          organizationId: user.orgId,
          periodType: PeriodType.DAY,
          periodStart: today,
          periodEnd: tomorrow,
          totalQuantity: validatedData.quantity,
          totalRevenue: totalAmount,
          totalProfit: profit,
          averagePrice: unitPrice,
        },
      });

      // 4. Update or create weekly sales aggregate
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);

      await tx.salesAggregate.upsert({
        where: {
          productId_periodType_periodStart: {
            productId: product.id,
            periodType: PeriodType.WEEK,
            periodStart: weekStart,
          },
        },
        update: {
          totalQuantity: { increment: validatedData.quantity },
          totalRevenue: { increment: totalAmount },
          totalProfit: { increment: profit },
          lastUpdated: new Date(),
        },
        create: {
          productId: product.id,
          organizationId: user.orgId,
          periodType: PeriodType.WEEK,
          periodStart: weekStart,
          periodEnd: weekEnd,
          totalQuantity: validatedData.quantity,
          totalRevenue: totalAmount,
          totalProfit: profit,
          averagePrice: unitPrice,
        },
      });

      // 5. Update or create monthly sales aggregate
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      monthEnd.setHours(23, 59, 59, 999);

      console.log("Monthly Upsert Data - totalAmount:", totalAmount, "monthStart:", monthStart, "monthEnd:", monthEnd);

      await tx.salesAggregate.upsert({
        where: {
          productId_periodType_periodStart: {
            productId: product.id,
            periodType: PeriodType.MONTH,
            periodStart: monthStart,
          },
        },
        update: {
          totalQuantity: { increment: validatedData.quantity },
          totalRevenue: { increment: totalAmount },
          totalProfit: { increment: profit },
          lastUpdated: new Date(),
        },
        create: {
          productId: product.id,
          organizationId: user.orgId,
          periodType: PeriodType.MONTH,
          periodStart: monthStart,
          periodEnd: monthEnd,
          totalQuantity: validatedData.quantity,
          totalRevenue: totalAmount,
          totalProfit: profit,
          averagePrice: unitPrice,
        },
      });

      return { sale, updatedProduct };
    });

    // Revalidate the product page to show updated stock
    revalidatePath(`/sales/${product.id}`);
    revalidatePath("/sales");
    revalidatePath("/inventory");

    return {
      success: true,
      message:
        `Successfully purchased ${validatedData.quantity} units of ${product.name}`,
      sale: result.sale,
      updatedProduct: result.updatedProduct,
    };
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    console.error("Error creating purchase:", errorMessage);
    return { error: "Failed to process purchase. Please try again." };
  }
}
