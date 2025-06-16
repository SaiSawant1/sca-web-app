"use server";

import { NotificationStatus, PeriodType } from "@prisma/client";
import { z } from "zod";
import prisma from "../lib/prisma";
import { createPurchase } from "../actions/productSale";



const ProcessNotificationSchema = z.object({
  notificationId: z.string(),
});

type ProcessNotificationInput = z.infer<typeof ProcessNotificationSchema>;

export async function processNotification(data: ProcessNotificationInput) {
  try {
    // Validate input
    const validatedData = ProcessNotificationSchema.parse(data);

    // Get the notification
    const notification = await prisma.notification.findUnique({
      where: { id: validatedData.notificationId },
      include: { product: true },
    });
    if (!notification) {
      return { error: "Notification not found." };
    }
    if (notification.status !== "PENDING") {
      return { error: "Notification already processed." };
    }

    const product = notification.product;
    if (!product) {
      return { error: "Product not found." };
    }
    if (product.stock < notification.quantity) {
      return {
        error: `Not enough stock. Only ${product.stock} units available.`,
      };
    }

    // Calculate sale details
    const unitPrice = product.sellingPrice;
    const totalAmount = unitPrice * notification.quantity;
    const taxAmount = totalAmount * (product.taxRate / 100);
    const profit = (unitPrice - product.costPrice) * notification.quantity;

    // Call createPurchase to handle sale details, stock update, and aggregates
    const purchaseResult = await createPurchase({
      productId: product.id,
      quantity: notification.quantity,
    });

    if (purchaseResult.error) {
      return { error: purchaseResult.error };
    }

    // Mark notification as processed
    await prisma.notification.update({
      where: { id: notification.id },
      data: {
        status: NotificationStatus.PROCESSED,
        processedAt: new Date(),
      },
    });

    return { success: true, message: "Purchase processed and sale recorded." };
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    console.error("Error processing notification:", errorMessage);
    return { error: "Failed to process notification. Please try again." };
  }
}
 