"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Box,
  Calendar,
  Clock,
  DollarSign,
  Package,
  Percent,
  Tag,
  Truck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useAction } from "@/hooks/use-action";
import {
  ProductCategoryEnum,
  ProductFormSchema,
  RegionEnum,
  SeasonEnum,
} from "./product-form-schema";
import { toast } from "sonner";
import { CreateProductAction } from "../../../../actions/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const { execute, isLoading } = useAction(CreateProductAction, {
    onSuccess: () => {
      toast.success("Product created successfully");
      router.push("/inventory/products");
    },
    onError: (error) => {
      setError(error);
      toast.error(`Failed to create product: ${error}`);
    },
  });

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      stock: 0,
      reorderPoint: 0,
      sellingPrice: 0,
      costPrice: 0,
      taxRate: 0,
      isActive: true,
      isFeatured: false,
      image: "",
      warehouseId: 1,
      leadtime: 0,
      supplierReliability: 0.5,
      transportCost: 0,
      promotion: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductFormSchema>) => {
    setError("");
    toast.promise(execute(values), {
      loading: "Creating product...",
      success: "Product created successfully",
      error: (err) => `Failed to create product: ${err}`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Package className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Fill in the details to add a new product to your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="categorization">
                    Categorization
                  </TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="supplier">Supplier</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your product&apos;s display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter product description"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description of your product.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter brand" {...field} />
                          </FormControl>
                          <FormDescription>
                            Product brand.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter image URL" {...field} />
                          </FormControl>
                          <FormDescription>
                            URL to the product image.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? parseFloat(e.target.value)
                                    : undefined,
                                )}
                            />
                          </FormControl>
                          <FormDescription>
                            Product weight in kilograms.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dimensions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dimensions</FormLabel>
                          <FormControl>
                            <Input placeholder="L x W x H" {...field} />
                          </FormControl>
                          <FormDescription>
                            Product dimensions (length x width x height).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="categorization" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(ProductCategoryEnum.enum).map((
                                category,
                              ) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Product category.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub-Category</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter sub-category"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Product sub-category.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a region" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(RegionEnum.enum).map((region) => (
                                <SelectItem key={region} value={region}>
                                  {region}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Product region.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="season"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Season</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a season" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(SeasonEnum.enum).map((season) => (
                                <SelectItem key={season} value={season}>
                                  {season}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Product season.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="warehouseId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Warehouse ID</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Box className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="1"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Warehouse ID where the product is stored.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="leadtime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lead Time (days)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Time required to receive the product after ordering.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="sellingPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selling Price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0.00"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Selling price of the product.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="costPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost Price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0.00"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Cost price of the product.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="taxRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Rate (%)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Percent className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="promotion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Promotion (%)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Promotion percentage for the product.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="transportCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transport Cost</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Truck className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0.00"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Cost of transporting the product.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="supplierReliability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supplier Reliability</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Percent className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0.5"
                                step="0.1"
                                min="0"
                                max="1"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Supplier reliability score (0-1).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="inventory" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Box className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Current stock quantity.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reorderPoint"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reorder Point</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Box className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Stock level at which to reorder.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="date"
                              className="pl-8"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          For perishable items only
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="supplier" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="supplierName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter supplier name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplierContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier Contact</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter supplier contact"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplierAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter supplier address"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <Separator />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/inventory/products")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Product"}
                </Button>
              </div>
            </form>
          </Form>

          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
