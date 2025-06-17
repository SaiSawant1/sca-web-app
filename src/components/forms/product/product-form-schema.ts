import * as z from "zod";

// Define enums to match Prisma schema
export const ProductCategoryEnum = z.enum([
  "Electronics",
  "Grocery",
  "Beverages",
  "Raw_Materials",
  "Pharmaceuticals",
]);

export const SubCategoryEnum = {
  Electronics: ["Smartphones", "Laptops", "Accessories", "Audio", "Gaming", "Cameras", "Wearables"],
  Grocery: ["Dairy", "Bakery", "Frozen", "Canned", "Snacks", "Meat", "Produce"],
  Beverages: ["Soda", "Water", "Juice", "Coffee", "Tea", "Alcohol", "Energy_Drinks"],
  Raw_Materials: ["Vegetables", "Fruits", "Grains", "Spices", "Herbs", "Oils", "Sweeteners"],
  Pharmaceuticals: ["Antibiotics", "Painkillers", "Vitamins", "Supplements", "Prescribed", "OTC", "Specialty"],
} as const;

export const RegionEnum = z.enum([
  "North",
  "South",
  "East",
  "West",
  "Central",
]);

export const SeasonEnum = z.enum([
  "Spring",
  "Summer",
  "Fall",
  "Winter",
  "All_Year",
]);

export const ProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  image: z.string().optional(),
  weight: z.number().min(0, "Weight must be positive"),
  dimensions: z.string().optional(),
  category: ProductCategoryEnum,
  subCategory: z.string().min(1, "Sub-category is required"),
  region: RegionEnum,
  season: SeasonEnum,
  warehouseId: z.number().min(1, "Warehouse ID is required"),
  leadtime: z.number().min(0, "Lead time must be positive"),
  sellingPrice: z.number().min(0, "Selling price must be positive"),
  costPrice: z.number().min(0, "Cost price must be positive"),
  taxRate: z.number().min(0, "Tax rate must be positive"),
  promotion: z.number().min(0, "Promotion must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  reorderPoint: z.number().min(0, "Reorder point must be positive"),
  expiryDate: z.string().optional(),
  supplierName: z.string().min(1, "Supplier name is required"),
  supplierContact: z.string().min(1, "Supplier contact is required"),
  supplierAddress: z.string().min(1, "Supplier address is required"),
  supplierReliability: z.number().min(0).max(1),
  transportCost: z.number().min(0, "Transport cost must be positive"),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export type ProductFormType = z.infer<typeof ProductFormSchema>;
