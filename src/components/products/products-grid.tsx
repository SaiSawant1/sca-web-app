"use client";
import { ProductCard, ProductCardProps } from "./product-card";

// Dummy data for products
const dummyProducts: ProductCardProps[] = [
  {
    id: "1",
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with precision tracking and long battery life.",
    price: 29.99,
    stock: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    description:
      "RGB mechanical keyboard with customizable switches and programmable keys.",
    price: 89.99,
    stock: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "USB-C Charger",
    description:
      "Fast-charging USB-C adapter compatible with most modern devices.",
    price: 19.99,
    stock: 78,
    imageUrl:
      "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Noise Cancelling Headphones",
    description:
      "Premium wireless headphones with active noise cancellation technology.",
    price: 199.99,
    stock: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Webcam HD",
    description: "1080p webcam with built-in microphone and privacy cover.",
    price: 49.99,
    stock: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1596566267083-4c5d0d6f1c0c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "6",
    name: 'LED Monitor 24"',
    description: "Full HD monitor with IPS panel and eye-care technology.",
    price: 149.99,
    stock: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "External SSD 1TB",
    description:
      "Portable solid-state drive with USB 3.0 connectivity and rugged design.",
    price: 129.99,
    stock: 32,
    imageUrl:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    description:
      "Waterproof portable speaker with 360° sound and 12-hour battery life.",
    price: 79.99,
    stock: 24,
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "9",
    name: "Laptop Stand",
    description:
      "Adjustable aluminum stand with anti-slip base and cable management.",
    price: 34.99,
    stock: 56,
    imageUrl:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "10",
    name: "Gaming Mouse Pad",
    description:
      "Large RGB mousepad with non-slip base and optimized surface for gaming.",
    price: 24.99,
    stock: 67,
    imageUrl:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "11",
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with Qi-enabled devices.",
    price: 39.99,
    stock: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "12",
    name: "USB Hub 7-Port",
    description:
      "Powered USB hub with individual power switches and LED indicators.",
    price: 29.99,
    stock: 42,
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "13",
    name: "Desk Lamp LED",
    description:
      "Adjustable LED desk lamp with multiple brightness levels and color temperatures.",
    price: 44.99,
    stock: 29,
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "14",
    name: "Keyboard Wrist Rest",
    description: "Ergonomic memory foam wrist rest with non-slip base.",
    price: 19.99,
    stock: 73,
    imageUrl:
      "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "15",
    name: "Monitor Light Bar",
    description:
      "Clip-on LED light bar with adjustable brightness and color temperature.",
    price: 59.99,
    stock: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "16",
    name: "USB Microphone",
    description: "Condenser microphone with pop filter and adjustable stand.",
    price: 69.99,
    stock: 21,
    imageUrl:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1000&auto=format&fit=crop",
  },
];

export function ProductsGrid() {
  const handleEdit = (id: string) => {
    console.log("Edit product:", id);
    // In a real app, this would navigate to an edit page or open a modal
  };

  const handleDelete = (id: string) => {
    console.log("Delete product:", id);
    // In a real app, this would show a confirmation dialog
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {dummyProducts.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
