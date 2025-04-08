"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../../../actions/product";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Grid, List, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await getProducts();

        if (result.error) {
          setError(result.error);
          return;
        }

        if (result.products) {
          setProducts(result.products);
        }
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/sales/${productId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Products for Sale</h1>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="bg-gray-800 hover:bg-gray-700 border-gray-700"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="bg-gray-800 hover:bg-gray-700 border-gray-700"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse bg-gray-900 border-gray-800">
              <div className="h-48 bg-gray-800 rounded-t-md"></div>
              <CardHeader>
                <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-gray-800 rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-red-400 text-center bg-red-900/20 p-4 rounded-md border border-red-800">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Products for Sale</h1>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-primary hover:bg-primary/90" : "bg-gray-800 hover:bg-gray-700 border-gray-700"}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-primary hover:bg-primary/90" : "bg-gray-800 hover:bg-gray-700 border-gray-700"}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "grid"
        ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-primary/50 hover:translate-y-[-4px]"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative h-48 w-full">
                  {product.image
                    ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )
                    : (
                      <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-500">
                          No image available
                        </span>
                      </div>
                    )}
                  {product.isFeatured && (
                    <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary/90">Featured</Badge>
                  )}
                </div>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-100">{product.name}</h2>
                  <p className="text-sm text-gray-400">{product.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(product.sellingPrice)}
                  </span>
                  <Button className="bg-primary hover:bg-primary/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )
        : (
          <div className="space-y-4">
            {products.map((product) => (
              <Card
                key={product.id}
                className="flex flex-row cursor-pointer hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-primary/50"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative h-32 w-32 flex-shrink-0">
                  {product.image
                    ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )
                    : (
                      <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-500">
                          No image available
                        </span>
                      </div>
                    )}
                  {product.isFeatured && (
                    <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary/90">Featured</Badge>
                  )}
                </div>
                <div className="flex flex-1 p-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-100">{product.name}</h2>
                    <p className="text-sm text-gray-400">{product.category}</p>
                    <p className="text-gray-400 mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-end ml-4">
                    <span className="text-xl font-bold text-primary">
                      {formatCurrency(product.sellingPrice)}
                    </span>
                    <Button className="bg-primary hover:bg-primary/90">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
    </div>
  );
}
