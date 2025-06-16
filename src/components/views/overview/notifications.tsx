"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "./notification";
import { Bell, DollarSign, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NotificationRefreshButton } from "./notification-refresh-button";
import { useEffect, useState } from "react";
import { NotificationType, getNotifications } from "../../../../actions/get-notifications";

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const totalProfit = notifications.reduce(
    (acc, curr) => acc + curr.product.sellingPrice * curr.quantity,
    0,
  );
  const averageProfit = notifications.length
    ? totalProfit / notifications.length
    : 0;

  return (
    <Card className="flex-1 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Recent Sales
            </CardTitle>
            <Badge variant="outline" className="h-6 font-normal">
              {notifications.length} transactions
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <CardDescription className="text-sm text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-primary" />
              Total: ${totalProfit.toLocaleString()}
            </CardDescription>
            <CardDescription className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              Avg: ${averageProfit.toLocaleString()}
            </CardDescription>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="h-8 w-8 p-0 flex items-center justify-center"
        >
          <Bell className="h-4 w-4" />
        </Badge>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-4 py-2">
            {isLoading ? (
              <div>Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div>No notifications found.</div>
            ) : (
              notifications.map((item) => (
                <Notification
                  key={item.id}
                  id={item.id}
                  status={item.status}
                  email={item.fromOrg.email}
                  name={item.fromOrg.name}
                  profit={(item.product.sellingPrice * item.quantity)
                    .toString()}
                  avatar={"/01.png"} // Replace with real avatar if available
                  time={new Date(item.createdAt).toLocaleString()}
                  productId={item.product.id}
                />
              ))
            )}
          </div>
        </ScrollArea>
        <Separator className="my-4" />
        <div className="flex justify-end pr-6 pb-4">
          <NotificationRefreshButton />
        </div>
      </CardContent>
    </Card>
  );
}
