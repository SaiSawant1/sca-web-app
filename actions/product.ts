"use server";

import { z } from "zod";
import { ProductFormSchema } from "@/components/forms/product/product-form-schema";
import type { Product } from "@prisma/client";
import prisma from "../lib/prisma";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { getSession } from "../lib/auth/auth-server";

export type ProductInputType = z.infer<typeof ProductFormSchema>;
export type ProductReturnType = ActionState<ProductInputType, Product>;

// Function to fetch all products for the current organization
export async function getProducts() {
  try {
    const user = await getSession();

    if (!user) {
      return { error: "You must be logged in to view products." };
    }

    const products = await prisma.product.findMany({
      where: {
        organizationId: user.orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { products };
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    console.error("Error fetching products:", errorMessage);
    return { error: "Failed to fetch products. Please try again." };
  }
}

// Function to get sales data for all products
export async function getSalesData() {
  try {
    const user = await getSession();

    if (!user) {
      return { error: "You must be logged in to view sales data." };
    }

    // Get all products for the organization
    const products = await prisma.product.findMany({
      where: {
        organizationId: user.orgId,
      },
      select: {
        id: true,
        name: true,
        sellingPrice: true,
        costPrice: true,
        totalSold: true,
      },
    });

    // Calculate total sales metrics
    const totalRevenue = products.reduce((sum, product) => 
      sum + (product.sellingPrice * product.totalSold), 0);
    
    const totalCost = products.reduce((sum, product) => 
      sum + (product.costPrice * product.totalSold), 0);
    
    const totalProfit = totalRevenue - totalCost;
    
    const totalUnitsSold = products.reduce((sum, product) => 
      sum + product.totalSold, 0);
    
    // Calculate percentage change (mock data for now)
    const previousMonthRevenue = totalRevenue * 0.8; // Assuming 20% less last month
    const percentageChange = ((totalRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;

    return { 
      salesData: {
        totalRevenue,
        totalCost,
        totalProfit,
        totalUnitsSold,
        percentageChange,
        productCount: products.length,
      } 
    };
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    console.error("Error fetching sales data:", errorMessage);
    return { error: "Failed to fetch sales data. Please try again." };
  }
}

// Function to fetch a single product by ID
export async function getProductById(productId: string) {
  try {
    const user = await getSession();

    if (!user) {
      return { error: "You must be logged in to view product details." };
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        organizationId: user.orgId,
      },
    });

    if (!product) {
      return { error: "Product not found." };
    }

    return { product };
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    console.error("Error fetching product:", errorMessage);
    return { error: "Failed to fetch product details. Please try again." };
  }
}

async function handler(input: ProductInputType): Promise<ProductReturnType> {
  try {
    // Ensure input is an object
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      return { error: "Invalid input data format" };
    }

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
