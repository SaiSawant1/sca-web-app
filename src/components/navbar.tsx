"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { LogoutAction } from "../../actions/logout";
import { toast } from "sonner";

export const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const { execute } = useAction(LogoutAction, {
    onSuccess: () => {
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(`Logout failed: ${error}`);
    },
  });

  const onLogout = async () => {
    await execute({});
  };

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
            <Link href={"/inventory/products"}>Products</Link>
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
          <AvatarImage
            className="w-10 h-10 rounded-full"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
