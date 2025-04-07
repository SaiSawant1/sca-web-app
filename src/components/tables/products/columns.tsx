"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Package, DollarSign, TrendingUp, Box, MoreHorizontal } from "lucide-react";
import { ActionDropdown } from "./action-dropdown";
import { Badge } from "@/components/ui/badge";

export type Product = {
  id: string;
  product: string;
  costPrice: number;
  sellingPrice: number;
  totalSold: number;
  stock: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Package className="h-4 w-4" />
          <span>Product ID</span>
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Product Name</span>
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue("product")}
        </div>
      );
    },
  },
  {
    accessorKey: "costPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <DollarSign className="h-4 w-4" />
          <span>Cost Price</span>
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("costPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <DollarSign className="h-4 w-4" />
          <span>Selling Price</span>
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("sellingPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "totalSold",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Total Sold</span>
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("totalSold") as number;
      return (
        <div className="text-center">
          <Badge variant={value > 100 ? "default" : "outline"}>
            {value}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Box className="h-4 w-4" />
          <span>Stock</span>
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("stock") as number;
      return (
        <div className="text-center">
          <Badge 
            variant={
              value > 50 ? "default" : 
              value > 20 ? "secondary" : 
              "destructive"
            }
          >
            {value}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <ActionDropdown id={row.getValue("id")} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
