import { Navbar } from "@/components/navbar";
import { Suspense } from "react";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative">
          <div className="absolute left-4 top-4 z-10">
          </div>
        </div>
        <main className="flex-1 overflow-auto">
          <Suspense fallback={<div>loading....</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
