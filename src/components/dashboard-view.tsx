import { DashboardViewSelector } from "./dashboard-view-selector";
import { DashboardCards } from "./dashboard-cards";
import { Overview } from "./overview";
import ProductsView from "./products-view";

export const DashboardView = ({ view }: { view: string }) => {
  return (
    <div className="py-6">
      <DashboardViewSelector currentView={view} />
      <DashboardCards />
      {view === "Overview" && <Overview />}
      {view === "Products" && <ProductsView />}
    </div>
  );
};
