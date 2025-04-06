"use client";
import { Overview } from "./overview";
import { ProductsView } from "./products-view";
interface CurrentViewProps {
  view: "Overview" | "Products" | "Report" | "Notification";
}
export const CurrentView = ({ view }: CurrentViewProps) => {
  if (view == "Overview") {
    return <Overview />;
  } else if (view = "Products") {
    return <ProductsView />;
  } else {
    return <Overview />;
  }
};
