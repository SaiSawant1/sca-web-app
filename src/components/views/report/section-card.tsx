"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

interface SectionCardProps {
  title: string;
  description: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
}

const SectionCard = ({
  title,
  description,
  value,
  change,
  icon,
  prefix = "",
  suffix = "",
}: SectionCardProps) => {
  const isPositive = change >= 0;
  const formattedValue = `${prefix}${value.toLocaleString()}${suffix}`;
  const formattedChange = `${isPositive ? "+" : ""}${change.toFixed(1)}%`;

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 p-1.5 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">{formattedValue}</div>
          <div className="flex items-center gap-1 text-sm">
            {isPositive
              ? <ArrowUpRight className="h-4 w-4 text-primary" />
              : <ArrowDownRight className="h-4 w-4 text-destructive" />}
            <span className={isPositive ? "text-primary" : "text-destructive"}>
              {formattedChange}
            </span>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export function SectionCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SectionCard
        title="Total Revenue"
        description="Total revenue from all product sales"
        value={298000}
        change={12.5}
        icon={<DollarSign className="h-5 w-5" />}
        prefix="$"
      />
      <SectionCard
        title="New Customers"
        description="New customers acquired this period"
        value={2450}
        change={8.2}
        icon={<Users className="h-5 w-5" />}
      />
      <SectionCard
        title="Active Accounts"
        description="Currently active customer accounts"
        value={12450}
        change={-2.1}
        icon={<Activity className="h-5 w-5" />}
      />
      <SectionCard
        title="Growth Rate"
        description="Overall business growth rate"
        value={15.8}
        change={3.4}
        icon={<TrendingUp className="h-5 w-5" />}
        suffix="%"
      />
    </div>
  );
}
