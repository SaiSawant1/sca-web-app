import { Product } from "@/components/tables/products/columns";
import ProductTablePage from "@/components/tables/products/product-table";

async function getData(): Promise<Product[]> {
  return [
    {
      id: "1",
      product: "Wireless Mouse",
      costPrice: 10,
      sellingPrice: 20,
      totalSold: 150,
      stock: 40,
    },
    {
      id: "2",
      product: "Mechanical Keyboard",
      costPrice: 35,
      sellingPrice: 60,
      totalSold: 85,
      stock: 20,
    },
    {
      id: "3",
      product: "USB-C Charger",
      costPrice: 8,
      sellingPrice: 18,
      totalSold: 230,
      stock: 75,
    },
    {
      id: "4",
      product: "Noise Cancelling Headphones",
      costPrice: 50,
      sellingPrice: 100,
      totalSold: 60,
      stock: 10,
    },
    {
      id: "5",
      product: "Webcam HD",
      costPrice: 15,
      sellingPrice: 30,
      totalSold: 120,
      stock: 35,
    },
    {
      id: "6",
      product: 'LED Monitor 24"',
      costPrice: 90,
      sellingPrice: 150,
      totalSold: 45,
      stock: 12,
    },
    {
      id: "7",
      product: "External SSD 1TB",
      costPrice: 70,
      sellingPrice: 110,
      totalSold: 70,
      stock: 25,
    },
    {
      id: "8",
      product: "Bluetooth Speaker",
      costPrice: 20,
      sellingPrice: 40,
      totalSold: 160,
      stock: 50,
    },
    {
      id: "9",
      product: "Laptop Stand",
      costPrice: 12,
      sellingPrice: 25,
      totalSold: 200,
      stock: 60,
    },
    {
      id: "10",
      product: "Gaming Mouse Pad",
      costPrice: 5,
      sellingPrice: 12,
      totalSold: 310,
      stock: 90,
    },
  ];
}
export default async function ProductsView() {
  const data = await getData();
  return <ProductTablePage data={data} />;
}
