import { ChartAreaInteractive } from "./chart-area-interactive";
import { SectionCards } from "./section-card";

export const ReportView = () => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </div>
  );
};
