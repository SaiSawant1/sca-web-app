"use server";

import { getSession } from "../lib/auth/auth-server";
import prisma from "../lib/prisma";
import { Product } from "@prisma/client";

export async function getProducts(): Promise<Product[]> {
  try {
    const user = await getSession();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const products = await prisma.product.findMany({
      where: {
        organizationId: user.orgId,
      },
    });

    return products;
  } catch (error) {
    console.error("[GET_PRODUCTS]", error);
    throw new Error("Failed to fetch products");
  }
} 