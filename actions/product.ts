"use server";

import { z } from "zod";
import { ProductFormSchema } from "@/components/forms/product/product-form-schema";
import type { Product } from "@prisma/client";
import prisma from "../lib/prisma";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { getSession } from "../lib/auth/auth-server";

export type ProductInputType = z.infer<typeof ProductFormSchema>;
export type ProductReturnType = ActionState<ProductInputType, Product>;

async function handler(input: ProductInputType): Promise<ProductReturnType> {
  try {
    // Ensure input is an object
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      return { error: "Invalid input data format" };
    }
    console.log("input", input);

    // Get the current user's organization ID
    const user = await getSession();

    if (!user) {
      return { error: "You must be logged in to create a product." };
    }

    // Parse the expiry date if provided
    let expiryDate = null;
    if (input.expiryDate) {
      expiryDate = new Date(input.expiryDate);
    }

    // Create the product in the database
    const product = await prisma.product.create({
      data: {
        name: input.name,
        description: input.description || "",
        category: input.category,
        season: input.season,
        region: input.region,
        warehouseId: input.warehouseId,
        subCategory: input.subCategory,
        leadtime: input.leadtime,
        supplierReliability: input.supplierReliability,
        transportCost: input.transportCost,
        promotion: input.promotion,
        brand: input.brand || null,
        stock: input.stock,
        reorderPoint: input.reorderPoint,
        supplierAddress: input.supplierAddress,
        supplierName: input.supplierName || null,
        supplierContact: input.supplierContact || null,
        sellingPrice: input.sellingPrice,
        costPrice: input.costPrice,
        taxRate: input.taxRate || 0,
        weight: input.weight || null,
        dimensions: input.dimensions || null,
        isActive: input.isActive,
        isFeatured: input.isFeatured,
        image: input.image || "",
        expiryDate: expiryDate,
        organizationId: user.orgId,
      },
    });

    return { data: product };
  } catch (error) {
    // Safely handle error logging
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    console.log(errorMessage);
    return { error: "Failed to create product. Please try again." };
  }
}

export const CreateProductAction = createSafeAction(ProductFormSchema, handler);
