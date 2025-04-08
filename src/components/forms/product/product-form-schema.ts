import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  stock: z.number().min(0, "Stock must be a positive number"),
  reorderPoint: z.number().min(0, "Reorder point must be a positive number"),
  supplierAddress: z.string().min(1, "Supplier address is required"),
  supplierName: z.string().optional(),
  supplierContact: z.string().optional(),
  sellingPrice: z.number().min(0, "Selling price must be a positive number"),
  costPrice: z.number().min(0, "Cost price must be a positive number"),
  taxRate: z.number().min(0),
  weight: z.number().optional(),
  dimensions: z.string().optional(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  image: z.string(),
  tags: z.array(z.string()),
  expiryDate: z.string().optional(),
});

export type ProductFormType = z.infer<typeof ProductFormSchema>;
