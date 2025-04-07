"use client";

import { TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  ResponsiveContainer,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const chartData = [
  { month: "January", sale: 186, previousYear: 165 },
  { month: "February", sale: 305, previousYear: 285 },
  { month: "March", sale: 237, previousYear: 255 },
  { month: "April", sale: 173, previousYear: 150 },
  { month: "May", sale: 209, previousYear: 190 },
  { month: "June", sale: 214, previousYear: 195 },
];

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

export function BarChartView() {
  const currentTotal = chartData.reduce((acc, curr) => acc + curr.sale, 0);
  const previousTotal = chartData.reduce((acc, curr) => acc + curr.previousYear, 0);
  const percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;
  const isPositive = percentageChange > 0;

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
                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
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
                    formatter={(value: number) => `$${value}`}
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
          <div className="text-sm font-medium text-muted-foreground">Total Sales</div>
          <div className="flex items-center gap-1 text-2xl font-bold">
            <DollarSign className="h-5 w-5 text-primary" />
            {currentTotal.toLocaleString()}
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
