"use client";

import { useEffect, useState } from "react";
import { getProductById } from "../../../../actions/product";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building2,
  DollarSign,
  Mail,
  MapPin,
  Package,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductWithOrganization } from "../../../../types";

export default function ProductDetailsPage() {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;
  const [product, setProduct] = useState<ProductWithOrganization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const notificationId = searchParams.get("notificationId");
  const [notificationStatus, setNotificationStatus] = useState<string | null>(
    null,
  );

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

  useEffect(() => {
    if (notificationId) {
      // Fetch notification status
      fetch(`/api/notifications/status?id=${notificationId}`)
        .then((res) => res.json())
        .then((data) => setNotificationStatus(data.status));
    }
  }, [notificationId]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleApprove = async () => {
    setLoading(true);
    const res = await fetch("/api/notifications/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId }),
    });
    const data = await res.json();
    if (data.success) {
      setNotificationStatus("PROCESSED");
      // Optionally show a toast
    } else {
      alert(data.error || "Failed to approve");
    }
    setLoading(false);
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
        {/* Product Image */}
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

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500">{product.category}</p>
          </div>

          <div>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span>Stock: {product.stock} units</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>Price: {formatCurrency(product.sellingPrice)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span>Margin: {profitMargin.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span>Total Sold: {product.totalSold}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seller Information */}
          {product.organization && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Name:</span>
                    {product.organization.name || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Email:</span>
                    {product.organization.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Address:</span>
                    {product.organization.address || "N/A"}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Category:</span>
                  {product.category}
                </div>
                <div>
                  <span className="font-medium">Subcategory:</span>
                  {product.subCategory}
                </div>
                <div>
                  <span className="font-medium">Season:</span>
                  {product.season}
                </div>
                <div>
                  <span className="font-medium">Region:</span>
                  {product.region}
                </div>
                <div>
                  <span className="font-medium">Brand:</span>
                  {product.brand || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Warehouse ID:</span>
                  {product.warehouseId}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {notificationId && notificationStatus === "PENDING" && (
        <div className="flex gap-2 mt-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleApprove}
            disabled={loading}
          >
            {loading ? "Approving..." : "Approve"}
          </button>
          {/* Add Reject button if you implement reject logic */}
        </div>
      )}
    </div>
  );
}
