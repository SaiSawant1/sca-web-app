import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Product } from "@prisma/client";

interface ProductInfoHeaderProps {
  image: string;
  name: string;
  product?: Product;
}

export const ProductInfoHeader = ({ image, name, product }: ProductInfoHeaderProps) => {
  return (
    <div className="md:col-span-1">
      <BackgroundGradient className="rounded-[22px] p-1">
        <div className="bg-background rounded-[20px] overflow-hidden relative group">
          <div className="aspect-square w-full relative">
            <Image
              fill
              src={image}
              alt={name}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
          {product?.isFeatured && (
            <Badge 
              variant="secondary" 
              className="absolute top-3 right-3 bg-primary/90 text-primary-foreground hover:bg-primary/90 z-10"
            >
              Featured
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </BackgroundGradient>
    </div>
  );
};
