"use client";

import * as React from "react";
import { SectionCards } from "./section-card";
import { ChartAreaInteractive } from "./chart-area-interactive";
import { Separator } from "@/components/ui/separator";

export function ReportView() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Sales Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive overview of your product sales performance and metrics
        </p>
      </div>
      <Separator />
      <SectionCards />
      <ChartAreaInteractive />
    </div>
  );
}
