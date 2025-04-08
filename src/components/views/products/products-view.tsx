import ProductTablePage from "@/components/tables/products/product-table";
import { Product } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { getSession } from "../../../../lib/auth/auth-server";

async function getData(): Promise<Product[]> {
  const user = await getSession();
  const data = await prisma.product.findMany({
    where: {
      organizationId: user?.orgId,
    },
  });

  return data;
}
export default async function ProductsView() {
  const data = await getData();
  return <ProductTablePage data={data} />;
}
