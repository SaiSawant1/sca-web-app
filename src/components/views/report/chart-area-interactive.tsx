"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { BarChart, Bar, Tooltip as RechartsTooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, TrendingUp, Calendar, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Product sales data with actual sales and forecast
const chartData = [
  { date: "2024-01-01", actualSales: 12500, forecastSales: 12000, categoryA: 4500, categoryB: 3800, categoryC: 4200 },
  { date: "2024-01-15", actualSales: 13200, forecastSales: 12800, categoryA: 4800, categoryB: 4000, categoryC: 4400 },
  { date: "2024-02-01", actualSales: 14100, forecastSales: 13500, categoryA: 5100, categoryB: 4200, categoryC: 4800 },
  { date: "2024-02-15", actualSales: 14800, forecastSales: 14200, categoryA: 5400, categoryB: 4400, categoryC: 5000 },
  { date: "2024-03-01", actualSales: 15600, forecastSales: 15000, categoryA: 5700, categoryB: 4600, categoryC: 5300 },
  { date: "2024-03-15", actualSales: 16300, forecastSales: 15800, categoryA: 6000, categoryB: 4800, categoryC: 5500 },
  { date: "2024-04-01", actualSales: 17100, forecastSales: 16500, categoryA: 6300, categoryB: 5000, categoryC: 5800 },
  { date: "2024-04-15", actualSales: 17800, forecastSales: 17200, categoryA: 6600, categoryB: 5200, categoryC: 6000 },
  { date: "2024-05-01", actualSales: 18600, forecastSales: 18000, categoryA: 6900, categoryB: 5400, categoryC: 6300 },
  { date: "2024-05-15", actualSales: 19300, forecastSales: 18800, categoryA: 7200, categoryB: 5600, categoryC: 6500 },
  { date: "2024-06-01", actualSales: 20100, forecastSales: 19500, categoryA: 7500, categoryB: 5800, categoryC: 6800 },
  { date: "2024-06-15", actualSales: 20800, forecastSales: 20200, categoryA: 7800, categoryB: 6000, categoryC: 7000 },
  { date: "2024-07-01", actualSales: 21600, forecastSales: 21000, categoryA: 8100, categoryB: 6200, categoryC: 7300 },
  { date: "2024-07-15", actualSales: 22300, forecastSales: 21800, categoryA: 8400, categoryB: 6400, categoryC: 7500 },
  { date: "2024-08-01", actualSales: 23100, forecastSales: 22500, categoryA: 8700, categoryB: 6600, categoryC: 7800 },
  { date: "2024-08-15", actualSales: 23800, forecastSales: 23200, categoryA: 9000, categoryB: 6800, categoryC: 8000 },
  { date: "2024-09-01", actualSales: 24600, forecastSales: 24000, categoryA: 9300, categoryB: 7000, categoryC: 8300 },
  { date: "2024-09-15", actualSales: 25300, forecastSales: 24800, categoryA: 9600, categoryB: 7200, categoryC: 8500 },
  { date: "2024-10-01", actualSales: 26100, forecastSales: 25500, categoryA: 9900, categoryB: 7400, categoryC: 8800 },
  { date: "2024-10-15", actualSales: 26800, forecastSales: 26200, categoryA: 10200, categoryB: 7600, categoryC: 9000 },
  { date: "2024-11-01", actualSales: 27600, forecastSales: 27000, categoryA: 10500, categoryB: 7800, categoryC: 9300 },
  { date: "2024-11-15", actualSales: 28300, forecastSales: 27800, categoryA: 10800, categoryB: 8000, categoryC: 9500 },
  { date: "2024-12-01", actualSales: 29100, forecastSales: 28500, categoryA: 11100, categoryB: 8200, categoryC: 9800 },
  { date: "2024-12-15", actualSales: 29800, forecastSales: 29200, categoryA: 11400, categoryB: 8400, categoryC: 10000 },
];

// Category distribution data
const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home & Kitchen", value: 20 },
  { name: "Sports", value: 15 },
  { name: "Books", value: 5 },
];

// Monthly comparison data
const monthlyData = [
  { month: "Jan", current: 12500, previous: 11000 },
  { month: "Feb", current: 14100, previous: 12500 },
  { month: "Mar", current: 15600, previous: 13800 },
  { month: "Apr", current: 17100, previous: 15200 },
  { month: "May", current: 18600, previous: 16500 },
  { month: "Jun", current: 20100, previous: 17800 },
];

const chartConfig = {
  actualSales: {
    label: "Actual Sales",
    color: "hsl(var(--primary))",
  },
  forecastSales: {
    label: "Forecast",
    color: "hsl(var(--muted))",
  },
  categoryA: {
    label: "Electronics",
    color: "hsl(var(--chart-1))",
  },
  categoryB: {
    label: "Clothing",
    color: "hsl(var(--chart-2))",
  },
  categoryC: {
    label: "Home & Kitchen",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("6m");
  const [chartType, setChartType] = React.useState("sales");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-12-15");
    let monthsToSubtract = 6;
    if (timeRange === "3m") {
      monthsToSubtract = 3;
    } else if (timeRange === "1m") {
      monthsToSubtract = 1;
    }
    const startDate = new Date(referenceDate);
    startDate.setMonth(startDate.getMonth() - monthsToSubtract);
    return date >= startDate;
  });

  // Calculate growth rate
  const firstValue = filteredData[0]?.actualSales || 0;
  const lastValue = filteredData[filteredData.length - 1]?.actualSales || 0;
  const growthRate = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;
  const isPositiveGrowth = growthRate > 0;

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Product Sales Analytics
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            {timeRange === "6m" ? "6 Months" : timeRange === "3m" ? "3 Months" : "1 Month"}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          <span>Sales performance and forecasting</span>
        </CardDescription>
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <ToggleGroup
            type="single"
            value={chartType}
            onValueChange={setChartType}
            variant="outline"
            className="hidden sm:flex"
          >
            <ToggleGroupItem value="sales" className="h-8 px-2.5">
              Sales Trend
            </ToggleGroupItem>
            <ToggleGroupItem value="categories" className="h-8 px-2.5">
              Categories
            </ToggleGroupItem>
            <ToggleGroupItem value="comparison" className="h-8 px-2.5">
              Monthly
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-40"
              aria-label="Select time range"
            >
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="6m" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="3m" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="1m" className="rounded-lg">
                Last month
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {chartType === "sales" && (
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer
                config={chartConfig}
                className="w-full h-full"
              >
                <AreaChart data={filteredData}>
                  <defs>
                    <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient id="fillForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--muted))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--muted))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="4" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        }}
                        valueFormatter={(value) => `$${value.toLocaleString()}`}
                        indicator="dot"
                      />
                    }
                  />
                  <Area
                    dataKey="forecastSales"
                    type="monotone"
                    fill="url(#fillForecast)"
                    stroke="hsl(var(--muted))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Area
                    dataKey="actualSales"
                    type="monotone"
                    fill="url(#fillActual)"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>
        )}

        {chartType === "categories" && (
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="4" opacity={0.5} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <RechartsTooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar
                  dataKey="current"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="previous"
                  fill="hsl(var(--muted))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartType === "comparison" && (
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="4" opacity={0.5} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <RechartsTooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar
                  dataKey="current"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="previous"
                  fill="hsl(var(--muted))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
      <Separator className="my-2" />
      <CardFooter className="flex items-center justify-between pt-4">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-muted-foreground">Growth Rate</div>
          <div className="flex items-center gap-1 text-2xl font-bold">
            {isPositiveGrowth ? (
              <ArrowUpRight className="h-5 w-5 text-primary" />
            ) : (
              <ArrowDownRight className="h-5 w-5 text-destructive" />
            )}
            {Math.abs(growthRate).toFixed(1)}%
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span>Updated just now</span>
        </div>
      </CardFooter>
    </Card>
  );
}
