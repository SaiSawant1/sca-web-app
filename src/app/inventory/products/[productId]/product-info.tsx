"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@prisma/client";
import {
  Box,
  DollarSign,
  Edit,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const router = useRouter();

  const formattedSellingPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.sellingPrice);

  const formattedCostPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.costPrice);

  const profitMargin =
    ((product.sellingPrice - product.costPrice) / product.sellingPrice) * 100;

  const stockStatus = product.stock > 10
    ? { text: "In Stock", color: "text-green-500", bgColor: "bg-green-500/10" }
    : product.stock > 0
    ? { text: "Low Stock", color: "text-amber-500", bgColor: "bg-amber-500/10" }
    : { text: "Out of Stock", color: "text-red-500", bgColor: "bg-red-500/10" };

  const handleEdit = () => {
    router.push(`/inventory/products/${product.id}/edit`);
  };

  return (
    <div className="md:col-span-2 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          {product.isFeatured && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Featured
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          {product.description || "No description available"}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          {product.subCategory && (
            <Badge variant="outline" className="text-xs">
              {product.subCategory}
            </Badge>
          )}
          {product.season && (
            <Badge variant="outline" className="text-xs">
              {product.season}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="overflow-hidden">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              Price
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold text-primary">
              {formattedSellingPrice}
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Cost
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">
              {formattedCostPrice}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {profitMargin.toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Box className="h-4 w-4" />
              Stock
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{product.stock}</p>
            <p className={cn("text-xs mt-1", stockStatus.color)}>
              {stockStatus.text}
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <ShoppingCart className="h-4 w-4" />
              Sold
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">{product.totalSold}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Total units sold
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1" onClick={handleEdit}>
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
