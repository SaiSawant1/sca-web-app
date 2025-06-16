"use client";
import { Product } from "@prisma/client";
import { ProductCard } from "./product-card";
import { memo } from "react";

interface ProductsGridInterface {
  products: Product[];
}

export const ProductsGrid = memo(function ProductsGrid({ products }: ProductsGridInterface) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
});
