import { ProductPageHeader } from "@/components/product/product-page-header";
import { ProductInfoHeader } from "./product-info-header";
import { getProductById } from "../../../../../actions/product";
import { ProductInfo } from "./product-info";
import { ProductsInfoTabs } from "./products-info-tabs";

export default async function ProductPage(
  { params }: { params: { productId: string } },
) {
  const { product } = await getProductById(params.productId);
  if (!product) {
    return;
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Header with back button */}
      <ProductPageHeader />
      {/* Product Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProductInfoHeader image={product.image} name={product.name} />
        {/* Product Info */}
        <ProductInfo product={product} />
      </div>
      {/* Tabs Section */}
      <ProductsInfoTabs product={product} />
    </div>
  );
}
