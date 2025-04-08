"use client";

import { Filter, Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

export const ProductsPageControl = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-1 items-center gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9 bg-background/50 backdrop-blur-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <span>All Products</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>In Stock</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Low Stock</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Out of Stock</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="font-normal">
          124 Products
        </Badge>
        <Button
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          onClick={() => router.push("/inventory/products/new")}
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>
    </div>
  );
};
