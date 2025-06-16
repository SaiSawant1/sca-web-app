"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GetSalesOverviewAction } from "../../../../actions/get-sales-overview";

const chartConfig = {
  sale: {
    label: "Current Year",
    color: "hsl(var(--primary))",
  },
  previousYear: {
    label: "Previous Year",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig;

type ChartDataItem = {
  month: string;
  sale: number;
  previousYear: number;
};

type SalesData = {
  currentYear: { month: string; sale: number }[];
  previousYear: { month: string; sale: number }[];
};

export function BarChartView() {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const { execute } = useAction(GetSalesOverviewAction, {
    onSuccess: (data: unknown) => {
      const salesData = data as SalesData;
      if (salesData?.currentYear && salesData?.previousYear) {
        const formattedData = salesData.currentYear.map((item, index) => ({
          month: item.month,
          sale: item.sale,
          previousYear: salesData.previousYear[index].sale,
        }));
        setChartData(formattedData);
      }
    },
    onError: (error) => {
      toast.error(`Failed to load sales data: ${error}`);
    },
  });

  useEffect(() => {
    execute({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentTotal = chartData.reduce((acc, curr) => acc + curr.sale, 0);
  const previousTotal = chartData.reduce(
    (acc, curr) => acc + curr.previousYear,
    0,
  );
  const percentageChange = previousTotal
    ? ((currentTotal - previousTotal) / previousTotal) * 100
    : 0;
  const isPositive = percentageChange > 0;

  const currentMonthIndex = new Date().getMonth();
  const currentMonthSale = chartData.find(
    (item) =>
      new Date(item.month + " 1, " + new Date().getFullYear()).getMonth() ===
      currentMonthIndex,
  )?.sale || 0;

  return (
    <Card className="flex-1 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Sales Overview
            </CardTitle>
            <Badge variant="outline" className="font-normal">
              Monthly
            </Badge>
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            Monthly sales performance comparison
          </CardDescription>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant={isPositive ? "default" : "destructive"}
                className="h-6 px-2 text-xs flex items-center gap-1 transition-all duration-300 hover:scale-105"
              >
                {isPositive
                  ? <ArrowUpRight className="h-3 w-3" />
                  : <ArrowDownRight className="h-3 w-3" />}
                {Math.abs(percentageChange).toFixed(1)}%
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Compared to previous year</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="pb-4">
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="hsl(var(--border))"
                  strokeDasharray="4"
                  opacity={0.5}
                />
                <YAxis
                  dataKey="sale"
                  tickLine={false}
                  axisLine={false}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={{ fill: "hsl(var(--muted)/0.1)" }}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="previousYear"
                  fill="hsl(var(--muted))"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  animationDuration={1500}
                />
                <Bar
                  dataKey="sale"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  animationDuration={1500}
                >
                  <LabelList
                    dataKey="sale"
                    position="top"
                    offset={8}
                    className="fill-muted-foreground"
                    fontSize={11}
                    formatter={(value: number) =>
                      `$${Math.round(value).toLocaleString()}`}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <Separator className="my-2" />
      <CardFooter className="flex items-center justify-between pt-4">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-muted-foreground">
            Total Sales (Current Year)
          </div>
          <div className="flex items-center gap-1 text-2xl font-bold">
            <DollarSign className="h-5 w-5 text-primary" />
            {currentTotal.toLocaleString()}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-muted-foreground">
            This Month&apos;s Sales
          </div>
          <div className="flex items-center gap-1 text-2xl font-bold">
            <DollarSign className="h-5 w-5 text-primary" />
            {currentMonthSale.toLocaleString()}
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
