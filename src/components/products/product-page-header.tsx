import { Package } from "lucide-react";

export const ProductsPageHeader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Package className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Product Inventory
        </h1>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Manage your product catalog, track inventory levels, and update product
        details all in one place.
      </p>
    </div>
  );
};
