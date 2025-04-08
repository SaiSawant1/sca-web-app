import { DollarSign, TrendingUp, ShoppingCart, Package } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: "revenue" | "profit" | "units" | "products";
  change?: string;
  isPositive?: boolean;
}

export const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  isPositive = true 
}: DashboardCardProps) => {
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Get icon based on type
  const getIcon = () => {
    switch (icon) {
      case "revenue":
        return <DollarSign className="h-4 w-4" />;
      case "profit":
        return <TrendingUp className="h-4 w-4" />;
      case "units":
        return <ShoppingCart className="h-4 w-4" />;
      case "products":
        return <Package className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  // Format the value based on the type
  const formatValue = () => {
    if (typeof value === 'number') {
      if (icon === "revenue" || icon === "profit") {
        return formatCurrency(value);
      } else {
        return value.toLocaleString();
      }
    }
    return value;
  };

  return (
    <div className="border-gray-50/40 border-[1px] min-w-64 w-full rounded-md px-6 py-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p>{title}</p>
        {getIcon()}
      </div>
      <div>
        <h2 className="flex justify-start items-center text-3xl font-semibold">
          {formatValue()}
        </h2>
        {change && (
          <p className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "+" : "-"}{change}
          </p>
        )}
      </div>
    </div>
  );
};
