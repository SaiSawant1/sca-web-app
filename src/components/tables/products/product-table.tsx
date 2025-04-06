"use client";
import { columns, Product } from "./columns";
import { DataTable } from "@/components/tables/products/data-table";

export const ProductTablePage = ({ data }: { data: Product[] }) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
