import { BarChartView } from "./bar-chart";
import { Notifications } from "./notifications";

export const Overview = () => {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <BarChartView />
      <Notifications />
    </div>
  );
};
