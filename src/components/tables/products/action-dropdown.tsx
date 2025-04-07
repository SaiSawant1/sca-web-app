"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Download, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export const ActionDropdown = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push(`/inventory/products/${id}`);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push(`/inventory/products/${id}`);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            // Copy product ID to clipboard
            navigator.clipboard.writeText(id);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Copy className="h-4 w-4" />
          <span>Copy ID</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            // Download product details
            console.log(`Downloading product ${id}`);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            // Delete product
            console.log(`Deleting product ${id}`);
          }}
          className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
        >
          <Trash className="h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
