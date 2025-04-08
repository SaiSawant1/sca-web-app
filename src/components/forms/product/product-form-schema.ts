import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  reorderPoint: z.coerce.number().min(0, "Reorder point cannot be negative"),
  supplierAddress: z.string().min(1, "Supplier address is required"),
  supplierName: z.string().optional(),
  supplierContact: z.string().optional(),
  sellingPrice: z.coerce.number().min(0, "Selling price must be positive"),
  costPrice: z.coerce.number().min(0, "Cost price must be positive"),
  taxRate: z.coerce.number().min(0).max(100).default(0),
  weight: z.coerce.number().min(0).optional(),
  dimensions: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  expiryDate: z.string().optional(),
});

export type ProductFormType = z.infer<typeof ProductFormSchema>; 