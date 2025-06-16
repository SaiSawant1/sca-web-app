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
import { useState } from "react";

export const ActionDropdown = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: string) => {
    try {
      setIsLoading(true);
      switch (action) {
        case "view":
          router.push(`/inventory/products/${id}`);
          break;
        case "edit":
          router.push(`/inventory/products/${id}`);
          break;
        case "copy":
          await navigator.clipboard.writeText(id);
          break;
        case "export":
          console.log(`Downloading product ${id}`);
          break;
        case "delete":
          console.log(`Deleting product ${id}`);
          break;
      }
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isLoading}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleAction("view")}
          className="flex items-center gap-2 cursor-pointer"
          disabled={isLoading}
        >
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleAction("edit")}
          className="flex items-center gap-2 cursor-pointer"
          disabled={isLoading}
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleAction("copy")}
          className="flex items-center gap-2 cursor-pointer"
          disabled={isLoading}
        >
          <Copy className="h-4 w-4" />
          <span>Copy ID</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleAction("export")}
          className="flex items-center gap-2 cursor-pointer"
          disabled={isLoading}
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleAction("delete")}
          className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
          disabled={isLoading}
        >
          <Trash className="h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
