"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "./ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const path = usePathname();
  return (
    <nav className="w-full flex justify-between items-center border-gray-50/40 border-[1px] px-10 py-2 text-xl rounded-md font-bold">
      <div>
        <ul className="flex gap-10 text-gray-50/40 cursor-pointer">
          <li
            className={cn(
              "hover:text-white transition-all ease-in",
              path === "/inventory" && "text-white",
            )}
          >
            <Link href={"/"}>overview</Link>
          </li>
          <li
            className={cn(
              "hover:text-white transition-all ease-in",
              path === "/customers" && "text-white",
            )}
          >
            <Link href={"/customers"}>customers</Link>
          </li>
          <li
            className={cn(
              "hover:text-white transition-all ease-in",
              path === "/settings" && "text-white",
            )}
          >
            <Link href={"/settings"}>settings</Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-10">
        <Input
          className="border-gray-50/40 border-[1px] "
          placeholder="search..."
        />
        <Avatar>
          <AvatarImage
            className="w-10 h-10 rounded-full"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
