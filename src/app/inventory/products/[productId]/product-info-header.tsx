import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";

interface ProductInfoHeaderProps {
  image: string;
  name: string;
}

export const ProductInfoHeader = ({ image, name }: ProductInfoHeaderProps) => {
  return (
    <div className="md:col-span-1">
      <BackgroundGradient className="rounded-[22px] p-1">
        <div className="bg-background rounded-[20px] overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src={image}
            alt={name}
            className="w-full h-auto object-cover aspect-square"
          />
        </div>
      </BackgroundGradient>
    </div>
  );
};
