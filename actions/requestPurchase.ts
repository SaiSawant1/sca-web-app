"use server";

import { z } from "zod";
import { getSession } from "../lib/auth/auth-server";
import prisma from "../lib/prisma";

const RequestPurchaseSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

type RequestPurchaseInput = z.infer<typeof RequestPurchaseSchema>;

export async function requestPurchase(data: RequestPurchaseInput) {
  try {
    const user = await getSession();
    if (!user) {
      return { error: "You must be logged in to request a purchase." };
    }

    // Validate input
    const validatedData = RequestPurchaseSchema.parse(data);

    // Get the product (to find the seller)
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId },
    });
    if (!product) {
      return { error: "Product not found." };
    }

    // Create a notification for the seller
    await prisma.notification.create({
      data: {
        toOrgId: product.organizationId,
        fromOrgId: user.orgId,
        productId: product.id,
        quantity: validatedData.quantity,
        status: "PENDING",
      },
    });

    return { success: true, message: "Purchase request sent to seller." };
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    console.error("Error requesting purchase:", errorMessage);
    return { error: "Failed to request purchase. Please try again." };
  }
}

