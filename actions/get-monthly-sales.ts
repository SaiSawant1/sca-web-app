"use server";

import { getSession } from "../lib/auth/auth-server";
import prisma from "../lib/prisma";

export async function getMonthlySales() {
  try {
    const user = await getSession();

    if (!user) {
      return { error: "You must be logged in to view sales data." };
    }

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    currentMonthEnd.setHours(23, 59, 59, 999);

    const sales = await prisma.sale.findMany({
      where: {
        organizationId: user.orgId,
        saleDate: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
      include: {
        product: {
          select: { name: true, sellingPrice: true },
        },
        organization: {
          select: { name: true },
        },
      },
      orderBy: {
        saleDate: "desc",
      },
    });

    return { sales };
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    console.error("Error fetching monthly sales:", errorMessage);
    return { error: "Failed to fetch monthly sales. Please try again." };
  }
} 