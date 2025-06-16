import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { createPurchase } from "../../../../../actions/productSale";

export async function POST(req: NextRequest) {
  const { notificationId } = await req.json();

  // Get the notification
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
    include: { product: true },
  });

  if (!notification) {
    return NextResponse.json({ error: "Notification not found." }, { status: 404 });
  }
  if (notification.status !== "PENDING") {
    return NextResponse.json({ error: "Notification already processed." }, { status: 400 });
  }

  // Mark notification as processed
  await prisma.notification.update({
    where: { id: notificationId },
    data: { status: "PROCESSED", processedAt: new Date() },
  });

  // Create the purchase (as the buyer)
  const purchaseResult = await createPurchase({
    productId: notification.productId,
    quantity: notification.quantity,
  });

  if (purchaseResult.error) {
    return NextResponse.json({ error: purchaseResult.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Purchase approved and sale recorded." });
} 