"use client";
import { ProductAnalysis } from "@/components/products/product-analysis";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SparklesCore } from "@/components/ui/sparkles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@prisma/client";
import { Truck, Users } from "lucide-react";

interface ProductsInfoTabsProps {
  product: Product;
}

export const ProductsInfoTabs = ({ product }: ProductsInfoTabsProps) => {
  return (
    <Tabs
      defaultValue="overview"
      className="w-full"
      onValueChange={() => { }}
    >
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="supplier">Supplier</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
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
                      {((product.sellingPrice - product.costPrice) /
                        product.sellingPrice *
                        100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
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
                  {product.supplierName}
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>{product.supplierAddress}</p>
                  <p>Phone: {product.supplierContact}</p>
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
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analysis" className="mt-6">
        <ProductAnalysis />
      </TabsContent>
    </Tabs>
  );
};
