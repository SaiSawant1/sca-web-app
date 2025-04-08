"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Filter, Package, Plus, Search } from "lucide-react";
import { ProductsGrid } from "@/components/products/products-grid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Product Inventory
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Manage your product catalog, track inventory levels, and update
            product details all in one place.
          </p>
        </div>

        <Separator className="my-2" />

        {/* Controls Section */}
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

        {/* Products Grid */}
        <div className="mt-4">
          <ProductsGrid />
        </div>
      </div>
    </div>
  );
}
