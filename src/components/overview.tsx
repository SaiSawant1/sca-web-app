import { BarChartView } from "./bar-chart";

export const Overview = () => {
  return (
    <div className="flex justify-center items-center">
      <BarChartView />
      <div className="flex-1">Notifications</div>
    </div>
  );
};
