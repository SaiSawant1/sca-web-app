"use client";
import { DashboardView } from "@/components/dashboard-view";
import { DatePickerRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function InventoryPage() {
  const view = useSearchParams().get("view") || "Overview";
  return (
    <div className="px-10 py-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-5xl">Dashboard</h1>
        <div className="flex items-center gap-4">
          <DatePickerRange />
          <Button size={"lg"} variant={"secondary"}>
            Download
          </Button>
        </div>
      </div>
      <DashboardView view={view} />
    </div>
  );
}
