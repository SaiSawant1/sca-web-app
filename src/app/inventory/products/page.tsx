import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductsGrid } from "@/components/products/products-grid";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Available Products</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <ProductsGrid />
    </div>
  );
}
