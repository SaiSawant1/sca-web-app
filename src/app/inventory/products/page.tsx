import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { ProductsGrid } from "@/components/products/products-grid";
import { ProductsPageHeader } from "@/components/products/product-page-header";
import { ProductsPageControl } from "@/components/products/product-control";
import { getProducts } from "../../../../actions/product";

export default async function ProductsPage() {
  const products = await getProducts();
  console.log(products);
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <ProductsPageHeader />

        <Separator className="my-2" />

        {/* Controls Section */}
        <ProductsPageControl />

        {/* Products Grid */}
        <div className="mt-4">
          <ProductsGrid />
        </div>
      </div>
    </div>
  );
}
