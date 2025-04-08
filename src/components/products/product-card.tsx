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

  const handleEdit = () => {
    router.push(`/inventory/products/${product.id}`);
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log("Delete product:", product.id);
  };

  return (
    <Card
      onClick={() => router.push(`/inventory/products/${product.id}`)}
      className="overflow-hidden"
    >
      <div className="aspect-video w-full overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={product.image || "/placeholder-product.jpg"}
          alt={product.name}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          {product.isFeatured && (
            <Badge variant="secondary" className="ml-2">Featured</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description || "No description available"}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-medium">{formattedPrice}</span>
          <span
            className={`text-sm ${product.stock > 10
                ? "text-green-500"
                : product.stock > 0
                  ? "text-amber-500"
                  : "text-red-500"
              }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          {product.subCategory && (
            <Badge variant="outline" className="text-xs">
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
          className="flex items-center gap-1"
        >
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          className="flex items-center gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
