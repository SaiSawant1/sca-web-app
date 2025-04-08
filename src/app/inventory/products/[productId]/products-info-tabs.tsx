"use client";
import { ProductAnalysis } from "@/components/products/product-analysis";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SparklesCore } from "@/components/ui/sparkles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@prisma/client";
import { Truck, Users, Package, BarChart3, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductsInfoTabsProps {
  product: Product;
}

export const ProductsInfoTabs = ({ product }: ProductsInfoTabsProps) => {
  const profitMargin = ((product.sellingPrice - product.costPrice) / product.sellingPrice) * 100;
  
  const stockStatus = product.stock > 20
    ? { text: "In Stock", variant: "default" as const }
    : product.stock > 0
      ? { text: "Low Stock", variant: "secondary" as const }
      : { text: "Out of Stock", variant: "destructive" as const };

  return (
    <Tabs
      defaultValue="overview"
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-5 mb-6">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="supplier" className="flex items-center gap-2">
          <Truck className="h-4 w-4" />
          <span className="hidden sm:inline">Supplier</span>
        </TabsTrigger>
        <TabsTrigger value="specifications" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          <span className="hidden sm:inline">Specs</span>
        </TabsTrigger>
        <TabsTrigger value="reviews" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Reviews</span>
        </TabsTrigger>
        <TabsTrigger value="analysis" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Analysis</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-0">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle>Product Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description || "No description available"}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Stock Level</span>
                    <Badge variant={stockStatus.variant}>
                      {stockStatus.text}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sales Performance</span>
                    <Badge variant="outline" className="font-medium">
                      {product.totalSold} units sold
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Profit Margin</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-medium",
                        profitMargin > 30 ? "text-green-500 border-green-500/20" : 
                        profitMargin > 15 ? "text-amber-500 border-amber-500/20" : 
                        "text-red-500 border-red-500/20"
                      )}
                    >
                      {profitMargin.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />
            
            <div>
              <h3 className="text-lg font-medium mb-3">Product Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Subcategory</p>
                  <p className="font-medium">{product.subCategory || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Season</p>
                  <p className="font-medium">{product.season || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Region</p>
                  <p className="font-medium">{product.region || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={product.isActive ? "default" : "secondary"}>
                    {product.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="supplier" className="mt-0">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Supplier Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {product.supplierName || "No supplier information"}
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>{product.supplierAddress || "No address provided"}</p>
                  <p>Phone: {product.supplierContact || "No contact provided"}</p>
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

            <Separator className="my-4" />

            <div>
              <h3 className="text-lg font-medium mb-4">Order History</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">Order #12345</p>
                    <p className="text-sm text-muted-foreground">
                      Delivered on May 15, 2023
                    </p>
                  </div>
                  <Badge>50 units</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">Order #12346</p>
                    <p className="text-sm text-muted-foreground">
                      Delivered on June 22, 2023
                    </p>
                  </div>
                  <Badge>75 units</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
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

      <TabsContent value="specifications" className="mt-0">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Physical Attributes</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight</span>
                    <span className="font-medium">{product.weight || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span className="font-medium">{product.dimensions || "N/A"}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Storage Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reorder Point</span>
                    <span className="font-medium">{product.reorderPoint || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expiry Date</span>
                    <span className="font-medium">
                      {product.expiryDate 
                        ? new Date(product.expiryDate).toLocaleDateString() 
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-0">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reviews available for this product yet.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analysis" className="mt-0">
        <ProductAnalysis />
      </TabsContent>
    </Tabs>
  );
};
