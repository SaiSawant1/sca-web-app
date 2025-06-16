"use client";
import ProductTablePage from "@/components/tables/products/product-table";
import { getProducts } from "../../../../actions/product";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

export default function ProductsView() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getProducts();
        if (result.error) {
          setError(result.error);
          return;
        }
        if (result.products) {
          setData(result.products);
        }
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <ProductTablePage data={data} />;
}
