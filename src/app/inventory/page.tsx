import { DashboardView } from "@/components/dashboard-view";
import { DatePickerRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";

export default async function InventoryPage(
  { searchParams }: { searchParams: { view: string } },
) {
  const view = (await searchParams).view || "Overview";
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
