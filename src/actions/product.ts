import { createSafeAction } from "@/lib/create-safe-action";
import { ProductFormSchema } from "@/components/forms/product/product-form-schema";
import { z } from "zod";

export const CreateProductAction = createSafeAction(
  ProductFormSchema,
  async (data) => {
    try {
      // Here you would typically save the product to your database
      // For now, we'll just return a success response
      return {
        data: {
          id: "new-product-id",
          ...data,
        },
      };
    } catch (error) {
      return {
        error: "Failed to create product",
      };
    }
  }
); 