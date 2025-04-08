"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Home, Package, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProductPage = pathname !== "/sales";

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/sales" className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Sales</span>
              </Link>
              
              {!isProductPage && (
                <nav className="hidden md:flex items-center gap-4">
                  <Link href="/sales">
                    <Button 
                      variant={pathname === "/sales" ? "default" : "ghost"}
                      className="gap-2"
                    >
                      <Home className="h-4 w-4" />
                      Products
                    </Button>
                  </Link>
                  <Link href="/inventory">
                    <Button 
                      variant="ghost"
                      className="gap-2 hover:bg-gray-800"
                    >
                      <Package className="h-4 w-4" />
                      Inventory
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button 
                      variant="ghost"
                      className="gap-2 hover:bg-gray-800"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                </nav>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        {children}
      </main>
      
      <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
        <div className="container mx-auto py-4">
          <div className="flex justify-center items-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
