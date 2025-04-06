"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/mode-toggle";

export const Navbar = () => {
  const path = usePathname();
  return (
    <nav className="w-full flex justify-between items-center border-gray-50/40 border-[1px] px-10 py-2 text-xl rounded-md transition-all ease-in">
      <div>
        <ul className="flex gap-10  cursor-pointer">
          <li
            className={cn(
              "hover:font-bold transition-all ease-in",
              path === "/inventory" && "font-bold",
            )}
          >
            <Link href={"/"}>overview</Link>
          </li>
          <li
            className={cn(
              "hover:font-bold transition-all ease-in",
              path === "/customers" && "font-bold",
            )}
          >
            <Link href={"/customers"}>customers</Link>
          </li>
          <li
            className={cn(
              "hover:font-bold transition-all ease-in",
              path === "/settings" && "font-bold",
            )}
          >
            <Link href={"/settings"}>settings</Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-10">
        <ModeToggle />
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
