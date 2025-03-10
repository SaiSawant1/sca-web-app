"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const DashboardView = () => {
  const [view, setView] = useState<
    "Overview" | "Analytics" | "Report" | "Notification"
  >("Overview");
  return (
    <div className="flex py-6">
      <div className="bg-gray-800 py-2 px-4 rounded-md">
        <ul className="flex gap-4 font-semibold ">
          <li
            onClick={() => setView("Overview")}
            className={cn(
              " px-3 py-1 rounded-md text-gray-50/40 cursor-pointer transition-all ease-in-out",
              view === "Overview" && "bg-black text-white",
            )}
          >
            Overview
          </li>
          <li
            onClick={() => setView("Analytics")}
            className={cn(
              " px-3 py-1 rounded-md text-gray-50/40 cursor-pointer transition-all ease-in-out",
              view === "Analytics" && "bg-black text-white",
            )}
          >
            Analytics
          </li>
          <li
            onClick={() => setView("Report")}
            className={cn(
              " px-3 py-1 rounded-md text-gray-50/40 cursor-pointer transition-all ease-in-out",
              view === "Report" && "bg-black text-white",
            )}
          >
            Report
          </li>
          <li
            onClick={() => setView("Notification")}
            className={cn(
              " px-3 py-1 rounded-md text-gray-50/40 cursor-pointer transition-all ease-in-out",
              view === "Notification" && "bg-black text-white",
            )}
          >
            Notification
          </li>
        </ul>
      </div>
    </div>
  );
};
