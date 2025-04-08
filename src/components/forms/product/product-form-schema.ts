import { z } from "zod";

// Define enums to match Prisma schema
export const ProductCategoryEnum = z.enum([
  "Beverages",
  "Electronics",
  "GeneralRF",
  "GeneralGB",
  "Grocery",
  "RawMaterials",
]);

export const RegionEnum = z.enum(["North", "South", "East", "West"]);

export const SeasonEnum = z.enum(["Monsoon", "Winter", "Summer"]);

export const ProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: ProductCategoryEnum,
  subCategory: z.string(),
  season: SeasonEnum,
  region: RegionEnum,
  warehouseId: z.number().min(1, "Warehouse ID is required"),
  leadtime: z.number().min(0, "Lead time must be a positive number"),
  supplierReliability: z.number().min(0).max(
    1,
    "Supplier reliability must be between 0 and 1",
  ),
  transportCost: z.number().min(0, "Transport cost must be a positive number"),
  promotion: z.number().min(0, "Promotion must be a positive number"),
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
  expiryDate: z.string().optional(),
});

export type ProductFormType = z.infer<typeof ProductFormSchema>;
