"use server";

import { getSession } from "../lib/auth/auth-server";
import { ActionState } from "@/lib/create-safe-action";
import prisma from "../lib/prisma";

type InputType = Record<string, never>;
type ReturnType = ActionState<InputType, {
  currentYear: { month: string; sale: number }[];
  previousYear: { month: string; sale: number }[];
}>;

export const GetSalesOverviewAction = async (): Promise<ReturnType> => {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "Not authenticated" };
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const previousYear = currentYear - 1;

    // Get current year's monthly sales aggregates, grouped by month
    const currentYearSalesAggregated = await prisma.salesAggregate.groupBy({
      by: ["periodStart"],
      where: {
        organizationId: session.orgId,
        periodType: "MONTH",
        periodStart: {
          gte: new Date(currentYear, 0, 1),
          lt: new Date(currentYear + 1, 0, 1),
        },
      },
      _sum: {
        totalRevenue: true,
      },
      orderBy: {
        periodStart: "asc",
      },
    });

    // Get previous year's monthly sales aggregates, grouped by month
    const previousYearSalesAggregated = await prisma.salesAggregate.groupBy({
      by: ["periodStart"],
      where: {
        organizationId: session.orgId,
        periodType: "MONTH",
        periodStart: {
          gte: new Date(previousYear, 0, 1),
          lt: new Date(previousYear + 1, 0, 1),
        },
      },
      _sum: {
        totalRevenue: true,
      },
      orderBy: {
        periodStart: "asc",
      },
    });

    // Transform the data into the required format
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentYearData = months.map((month, index) => {
      const saleAggregate = currentYearSalesAggregated.find((s) =>
        s.periodStart.getMonth() === index
      );
      return {
        month,
        sale: saleAggregate?._sum.totalRevenue || 0,
      };
    });

    const previousYearData = months.map((month, index) => {
      const saleAggregate = previousYearSalesAggregated.find((s) =>
        s.periodStart.getMonth() === index
      );
      return {
        month,
        sale: saleAggregate?._sum.totalRevenue || 0,
      };
    });
    return {
      data: {
        currentYear: currentYearData,
        previousYear: previousYearData,
      },
    };
  } catch (error) {
    return { error: `Failed to fetch sales data ${error}` };
  }
};
