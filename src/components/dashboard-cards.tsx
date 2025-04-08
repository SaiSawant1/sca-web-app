"use client";

import { DashboardCard } from "./dashboard-card";
import { getSalesData } from "../../actions/product";
import { useEffect, useState } from "react";

interface SalesData {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  totalUnitsSold: number;
  percentageChange: number;
  productCount: number;
}

export const DashboardCards = () => {
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const result = await getSalesData();
        
        if (result.error) {
          setError(result.error);
          return;
        }
        
        if (result.salesData) {
          setSalesData(result.salesData);
        }
      } catch (err) {
        setError("Failed to fetch sales data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return (
      <div className="py-4 flex w-fit gap-6">
        <div className="border-gray-50/40 border-[1px] min-w-64 w-full rounded-md px-6 py-5 flex flex-col gap-3 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-8 bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="border-gray-50/40 border-[1px] min-w-64 w-full rounded-md px-6 py-5 flex flex-col gap-3 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-8 bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="border-gray-50/40 border-[1px] min-w-64 w-full rounded-md px-6 py-5 flex flex-col gap-3 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-8 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="py-4 flex w-fit gap-6">
      <DashboardCard 
        title="Total Revenue" 
        value={salesData?.totalRevenue || 0} 
        icon="revenue"
        change={salesData?.percentageChange ? `${salesData.percentageChange.toFixed(1)}% from last month` : undefined}
        isPositive={salesData?.percentageChange ? salesData.percentageChange >= 0 : true}
      />
      <DashboardCard 
        title="Total Profit" 
        value={salesData?.totalProfit || 0} 
        icon="profit"
        change={`${((salesData?.totalProfit || 0) / (salesData?.totalRevenue || 1) * 100).toFixed(1)}% margin`}
        isPositive={true}
      />
      <DashboardCard 
        title="Units Sold" 
        value={salesData?.totalUnitsSold || 0} 
        icon="units"
        change={`${salesData?.productCount || 0} products`}
        isPositive={true}
      />
    </div>
  );
};
