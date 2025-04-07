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

export type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ProductCard({
  id,
  name,
  description,
  price,
  stock,
  imageUrl,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-medium">{formattedPrice}</span>
          <span
            className={`text-sm ${
              stock > 10
                ? "text-green-500"
                : stock > 0
                ? "text-amber-500"
                : "text-red-500"
            }`}
          >
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit?.(id)}
          className="flex items-center gap-1"
        >
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete?.(id)}
          className="flex items-center gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

