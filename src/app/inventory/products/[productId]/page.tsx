"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Package, Truck, Users } from "lucide-react";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { SparklesCore } from "@/components/ui/sparkles";
import Image from "next/image";

// Dummy data for a single product
const productData = {
  id: "1",
  name: "Wireless Mouse",
  description:
    "Ergonomic wireless mouse with precision tracking and long battery life. Features adjustable DPI settings, programmable buttons, and a comfortable grip design.",
  price: 29.99,
  costPrice: 15.50,
  stock: 45,
  totalSold: 128,
  imageUrl:
    "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1000&auto=format&fit=crop",
  supplier: {
    name: "TechSupplies Inc.",
    contact: "+1 (555) 123-4567",
    email: "orders@techsupplies.com",
    address: "123 Tech Lane, Silicon Valley, CA 94025",
    website: "www.techsupplies.com",
  },
  specifications: [
    { name: "Connectivity", value: "Bluetooth 5.0" },
    { name: "Battery Life", value: "Up to 12 months" },
    { name: "DPI Range", value: "400-3200 DPI" },
    { name: "Buttons", value: "6 programmable" },
    { name: "Color", value: "Black" },
    { name: "Weight", value: "95g" },
  ],
  reviews: [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      comment: "Great mouse, very comfortable for long use.",
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      comment: "Good battery life, but a bit small for my hand.",
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      comment: "Perfect for my setup, highly recommend.",
    },
  ],
  relatedProducts: [
    {
      id: "2",
      name: "Mechanical Keyboard",
      price: 89.99,
      imageUrl:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "9",
      name: "Laptop Stand",
      price: 34.99,
      imageUrl:
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "10",
      name: "Gaming Mouse Pad",
      price: 24.99,
      imageUrl:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1000&auto=format&fit=crop",
    },
  ],
};

export default function ProductPage() {
  const product = productData;

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/inventory/products">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Product Details</h1>
      </div>

      {/* Product Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Image */}
        <div className="md:col-span-1">
          <BackgroundGradient className="rounded-[22px] p-1">
            <div className="bg-background rounded-[20px] overflow-hidden">
              <Image
                width={1000}
                height={1000}
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
          </BackgroundGradient>
        </div>

        {/* Product Info */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-muted-foreground mt-2">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Price
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Cost
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">
                  ${product.costPrice.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Stock
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">{product.stock}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Sold
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">{product.totalSold}</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Button>
            <Button variant="outline" className="flex-1">
              <Package className="mr-2 h-4 w-4" />
              Manage Stock
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={() => {}}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="supplier">Supplier</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Stock Level</span>
                      <Badge
                        variant={product.stock > 20
                          ? "default"
                          : product.stock > 0
                          ? "secondary"
                          : "destructive"}
                      >
                        {product.stock > 20
                          ? "In Stock"
                          : product.stock > 0
                          ? "Low Stock"
                          : "Out of Stock"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Sales Performance</span>
                      <Badge variant="outline">
                        {product.totalSold} units sold
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit Margin</span>
                      <Badge variant="outline">
                        {((product.price - product.costPrice) / product.price *
                          100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Related Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {product.relatedProducts.map((relatedProduct) => (
                    <Link
                      href={`/inventory/products/${relatedProduct.id}`}
                      key={relatedProduct.id}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-square overflow-hidden">
                          <Image
                            height={1000}
                            width={1000}
                            src={relatedProduct.imageUrl}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium">{relatedProduct.name}</h4>
                          <p className="text-muted-foreground">
                            ${relatedProduct.price.toFixed(2)}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplier" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Supplier Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {product.supplier.name}
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>{product.supplier.address}</p>
                    <p>Phone: {product.supplier.contact}</p>
                    <p>Email: {product.supplier.email}</p>
                    <p>Website: {product.supplier.website}</p>
                  </div>
                </div>
                <div className="relative h-[200px] rounded-md overflow-hidden">
                  <div className="absolute inset-0">
                    <SparklesCore
                      id="tsparticles"
                      background="transparent"
                      minSize={0.6}
                      maxSize={1.4}
                      particleDensity={100}
                      className="w-full h-full"
                      particleColor="#FFFFFF"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4 bg-background/80 backdrop-blur-sm rounded-lg">
                      <h3 className="font-medium">Supplier Performance</h3>
                      <p className="text-sm text-muted-foreground">
                        Reliable supplier with consistent delivery times
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Order History</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Order #12345</p>
                      <p className="text-sm text-muted-foreground">
                        Delivered on May 15, 2023
                      </p>
                    </div>
                    <Badge>50 units</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Order #12346</p>
                      <p className="text-sm text-muted-foreground">
                        Delivered on June 22, 2023
                      </p>
                    </div>
                    <Badge>75 units</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Order #12347</p>
                      <p className="text-sm text-muted-foreground">
                        Delivered on August 10, 2023
                      </p>
                    </div>
                    <Badge>100 units</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-4 border rounded-lg"
                  >
                    <span className="font-medium">{spec.name}</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        2 days ago
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
