import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@prisma/client";
import { Edit, Package } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="md:col-span-2 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-muted-foreground mt-2">{product.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Price
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">
              ${product.sellingPrice.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cost
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">
              ${product.costPrice.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Stock
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{product.stock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sold
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{product.totalSold}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1">
          <Edit className="mr-2 h-4 w-4" />
          Edit Product
        </Button>
        <Button variant="outline" className="flex-1">
          <Package className="mr-2 h-4 w-4" />
          Manage Stock
        </Button>
      </div>
    </div>
  );
};
