"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({
  product,
}: ProductCardProps) {
  const router = useRouter();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.sellingPrice);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/inventory/products/${product.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement delete functionality
    console.log("Delete product:", product.id);
  };

  const stockStatus = product.stock > 10
    ? { text: "In Stock", color: "text-green-500" }
    : product.stock > 0
      ? { text: "Low Stock", color: "text-amber-500" }
      : { text: "Out of Stock", color: "text-red-500" };

  return (
    <Card
      onClick={() => router.push(`/inventory/products/${product.id}`)}
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 cursor-pointer"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={product.image || "/placeholder-product.jpg"}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        {product.isFeatured && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 bg-primary/90 text-primary-foreground hover:bg-primary/90"
          >
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1 text-lg font-semibold">
            {product.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground mb-3">
          {product.description || "No description available"}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">
            {formattedPrice}
          </span>
          <span className={cn("text-sm font-medium", stockStatus.color)}>
            {stockStatus.text}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs bg-background/50">
            {product.category}
          </Badge>
          {product.subCategory && (
            <Badge variant="outline" className="text-xs bg-background/50">
              {product.subCategory}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          className="flex items-center gap-1 transition-colors hover:bg-primary/10"
        >
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          className="flex items-center gap-1 text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
