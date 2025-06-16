"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotificationProps {
  id: string;
  status: string;
  name: string | null;
  email: string;
  profit: string;
  avatar: string;
  time: string;
  productId: string;
}

export const Notification = ({
  id,
  status,
  name,
  email,
  profit,
  avatar,
  time,
  productId,
}: NotificationProps) => {
  const router = useRouter();
  const profitValue = parseInt(profit);
  const isHighValue = profitValue > 10000;
  const [localStatus, setLocalStatus] = useState(status);

  const handleClick = () => {
    router.push(`/product/${productId}?notificationId=${id}`);
  };

  const handleApprove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch("/api/notifications/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: id }),
      });
      const data = await res.json();
      if (data.success) {
        setLocalStatus("PROCESSED");
        // Optionally show a toast
      } else {
        alert(data.error || "Failed to approve");
      }
    } catch (err) {
      alert(`Failed to approve ${err}`);
    }
  };

  const handleReject = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Call rejectNotification action with id
    alert(`Reject notification ${id}`);
  };

  return (
    <div
      className="flex items-center justify-between group transition-all duration-300 hover:bg-muted/50 rounded-lg p-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 border-2 border-background">
          <AvatarImage src={avatar} alt={name ? name : "avatar"} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {name ? name.slice(0, 2).toUpperCase() : "user name"}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium leading-none">{name}</p>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <DollarSign
          className={`h-4 w-4 ${isHighValue ? "text-primary" : "text-muted-foreground"
            }`}
        />
        <span
          className={`text-sm font-medium ${isHighValue ? "text-primary" : ""}`}
        >
          {profitValue.toLocaleString()}
        </span>
        {localStatus === "PENDING" && (
          <div className="flex gap-2 ml-4">
            <button
              className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
