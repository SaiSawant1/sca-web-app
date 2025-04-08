import { ArrowLeft, Link } from "lucide-react";
import { Button } from "../ui/button";

export const ProductPageHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link href="/inventory/products">
        <Button variant="outline" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>
      <h1 className="text-3xl font-bold">Product Details</h1>
    </div>
  );
};
