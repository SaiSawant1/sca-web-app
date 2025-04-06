import { DashboardViewSelector } from "./dashboard-view-selector";
import { DashboardCards } from "./dashboard-cards";
import { Overview } from "./views/overview/overview";
import ProductsView from "./views/products/products-view";
import { ReportView } from "./views/report/report-view";

export const DashboardView = ({ view }: { view: string }) => {
  return (
    <div className="py-6">
      <DashboardViewSelector currentView={view} />
      <DashboardCards />
      {view === "Overview" && <Overview />}
      {view === "Products" && <ProductsView />}
      {view === "Report" && <ReportView />}
    </div>
  );
};
