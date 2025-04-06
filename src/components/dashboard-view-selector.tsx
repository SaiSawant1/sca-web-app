"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface DashboardViewSelectorProps {
  currentView: string;
}
export const DashboardViewSelector = ({
  currentView,
}: DashboardViewSelectorProps) => {
  const router = useRouter();
  const setView = (view: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("view", view);
    router.push(`?${searchParams.toString()}`);
  };
  return (
    <div className="w-fit bg-gray-800 py-2  px-4 rounded-md">
      <ul className="flex gap-4 font-semibold ">
        <li
          onClick={() => setView("Overview")}
          className={cn(
            " px-3 py-1 rounded-md text-gray-50/40 cursor-pointer transition-all ease-in-out",
            currentView === "Overview" && "bg-black text-white",
          )}
        >
          Overview
        </li>
        <li
          onClick={() => setView("Products")}
          className={cn(
            " px-3 py-1 rounded-md text-gray-50/40 cursor-pointer transition-all ease-in-out",
            currentView === "Products" && "bg-black text-white",
          )}
        >
          Products
        </li>
        <li
          onClick={() => setView("Report")}
          className={cn(
            " px-3 py-1 rounded-md text-gray-50/40 cursor-pointer transition-all ease-in-out",
            currentView === "Report" && "bg-black text-white",
          )}
        >
          Report
        </li>
      </ul>
    </div>
  );
};
