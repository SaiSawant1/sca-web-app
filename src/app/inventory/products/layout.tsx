"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";

export default function ProductsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
