"use client";

import { useEffect, useState } from "react";
import { getProductById } from "../../../../actions/product";
import { requestPurchase } from "../../../../actions/requestPurchase";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  CreditCard,
  DollarSign,
  Loader2,
  Package,
  ShoppingCart,
  TrendingUp,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import React from "react";
import { ProductWithOrganization } from "../../../../types";

export default function ProductPage() {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;
  const [product, setProduct] = useState<ProductWithOrganization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const result = await getProductById(productId);

        if (result.error) {
          setError(result.error);
          return;
        }

        if (result.product) {
          setProduct(result.product);
        } else {
          notFound();
        }
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && product && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handlePurchase = async () => {
    if (!product) return;

    try {
      setIsPurchasing(true);

      const result = await requestPurchase({
        productId: product.id,
        quantity,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success) {
        toast.success(result.message);
        // No stock update here, since it's just a request!
        setQuantity(1);
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Failed to process purchase. Please try again.");
    } finally {
      setIsPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-700 rounded-md"></div>
          </div>
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-24 bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-700 rounded w-1/3"></div>
            <div className="h-10 bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-red-500 text-center">
          Error: {error || "Product not found"}
        </div>
      </div>
    );
  }

  const totalPrice = product.sellingPrice * quantity;
  const profitMargin =
    ((product.sellingPrice - product.costPrice) / product.sellingPrice) * 100;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 w-full">
          {product.image
            ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            )
            : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-md">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          {product.isFeatured && (
            <Badge className="absolute top-2 right-2">Featured</Badge>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500">{product.category}</p>
          </div>

          <div>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-500" />
            <span>In Stock: {product.stock} units</span>
          </div>

          <div className="text-2xl font-bold">
            {formatCurrency(product.sellingPrice)}
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Purchase Options</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  disabled={isPurchasing}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg">Total:</span>
                <span className="text-2xl font-bold">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handlePurchase}
                disabled={isPurchasing || product.stock < 1}
              >
                {isPurchasing
                  ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  )
                  : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Purchase Now
                    </>
                  )}
              </Button>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-1" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-100">Purchase</h2>
            </CardHeader>
            <CardContent>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">
                    Cost: {formatCurrency(product.costPrice)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">
                    Margin: {profitMargin.toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {product && product.organization && (
            <Card className="mb-4">
              <CardHeader>
                <h2 className="text-lg font-semibold">Seller Information</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span>
                    {product.organization.name || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    {product.organization.email}
                  </div>
                  <div>
                    <span className="font-medium">Address:</span>
                    {product.organization.address || "N/A"}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
