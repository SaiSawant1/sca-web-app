"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

// Dummy data for charts
const salesData = [
  { month: "Jan", sales: 120, forecast: 110 },
  { month: "Feb", sales: 150, forecast: 130 },
  { month: "Mar", sales: 180, forecast: 160 },
  { month: "Apr", sales: 200, forecast: 190 },
  { month: "May", sales: 220, forecast: 210 },
  { month: "Jun", sales: 250, forecast: 230 },
  { month: "Jul", sales: 280, forecast: 260 },
  { month: "Aug", sales: 300, forecast: 290 },
  { month: "Sep", sales: 320, forecast: 310 },
  { month: "Oct", sales: 350, forecast: 330 },
  { month: "Nov", sales: 380, forecast: 360 },
  { month: "Dec", sales: 400, forecast: 380 },
];

const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Accessories", value: 300 },
  { name: "Peripherals", value: 300 },
  { name: "Software", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const customerSegments = [
  { segment: "Individual", value: 45 },
  { segment: "Business", value: 30 },
  { segment: "Education", value: 15 },
  { segment: "Government", value: 10 },
];

const monthlyComparison = [
  { month: "Jan", lastYear: 100, thisYear: 120 },
  { month: "Feb", lastYear: 120, thisYear: 150 },
  { month: "Mar", lastYear: 140, thisYear: 180 },
  { month: "Apr", lastYear: 160, thisYear: 200 },
  { month: "May", lastYear: 180, thisYear: 220 },
  { month: "Jun", lastYear: 200, thisYear: 250 },
  { month: "Jul", lastYear: 220, thisYear: 280 },
  { month: "Aug", lastYear: 240, thisYear: 300 },
  { month: "Sep", lastYear: 260, thisYear: 320 },
  { month: "Oct", lastYear: 280, thisYear: 350 },
  { month: "Nov", lastYear: 300, thisYear: 380 },
  { month: "Dec", lastYear: 320, thisYear: 400 },
];

export function ProductAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Forecast Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  sales: { label: "Actual Sales", color: "#0088FE" },
                  forecast: { label: "Forecast", color: "#82ca9d" },
                }}
              >
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#0088FE"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#82ca9d"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  Electronics: { label: "Electronics", color: "#0088FE" },
                  Accessories: { label: "Accessories", color: "#00C49F" },
                  Peripherals: { label: "Peripherals", color: "#FFBB28" },
                  Software: { label: "Software", color: "#FF8042" },
                }}
              >
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  Individual: { label: "Individual", color: "#0088FE" },
                  Business: { label: "Business", color: "#00C49F" },
                  Education: { label: "Education", color: "#FFBB28" },
                  Government: { label: "Government", color: "#FF8042" },
                }}
              >
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Year-over-Year Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Year-over-Year Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  lastYear: { label: "Last Year", color: "#8884d8" },
                  thisYear: { label: "This Year", color: "#82ca9d" },
                }}
              >
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="lastYear" fill="#8884d8" />
                  <Bar dataKey="thisYear" fill="#82ca9d" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

