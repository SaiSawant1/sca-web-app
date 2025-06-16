"use server";

import prisma from "../lib/prisma";

export type NotificationType = {
  id: string;
  fromOrg: { name: string | null; email: string };
  product: { sellingPrice: number; id: string; description?: string | null };
  quantity: number;
  createdAt: string;
  status: string;
};

export async function getNotifications(): Promise<NotificationType[]> {
  const notifications = await prisma.notification.findMany({
    include: { fromOrg: true, product: true },
    orderBy: { createdAt: "desc" },
  });

  return notifications.map((n) => ({
    id: n.id,
    fromOrg: {
      name: n.fromOrg?.name ?? null,
      email: n.fromOrg?.email,
    },
    product: {
      id: n.product.id,
      description: n.product.description,
      sellingPrice: n.product.sellingPrice,
    },
    quantity: n.quantity,
    createdAt: n.createdAt.toISOString(),
    status: n.status,
  }));
} 