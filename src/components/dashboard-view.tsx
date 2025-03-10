"use client";
import { useState } from "react";
import { DashboardViewSelector } from "./dashboard-view-selector";
import { DashboardCards } from "./dashboard-cards";

export const DashboardView = () => {
  const [view, setView] = useState<
    "Overview" | "Analytics" | "Report" | "Notification"
  >("Overview");
  return (
    <div className="py-6">
      <DashboardViewSelector view={view} setView={setView} />
      <DashboardCards />
    </div>
  );
};
