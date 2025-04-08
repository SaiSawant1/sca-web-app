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
        sku: input.sku || null,
        barcode: input.barcode || null,
        category: input.category || null,
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
        tags: input.tags || [],
        expiryDate: expiryDate,
        organizationId: user.orgId,
      },
    });

    return { data: product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { error: "Failed to create product. Please try again." };
  }
}

export const CreateProductAction = createSafeAction(ProductFormSchema, handler);
