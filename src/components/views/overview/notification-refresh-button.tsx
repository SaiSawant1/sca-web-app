"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NotificationRefreshButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    // This will re-fetch data for all server components on the current route
    router.refresh();
    setLoading(false); // Consider if you need a more sophisticated loading state with actual data fetching completion
  };

  return (
    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
      <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
      <span className="sr-only">Refresh</span>
    </Button>
  );
} 