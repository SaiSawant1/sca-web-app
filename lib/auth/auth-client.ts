"use client";

import { useEffect, useState } from "react";
import { CustomeJWTPayload } from "./auth-server";

export const useSession = () => {
  const [session, setSession] = useState<CustomeJWTPayload | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setIsLoading(true);
    try {
      fetch("/api/get-session").then((res) => {
        res.json().then((value) => {
          if (value.error) {
            setError(value.error);
          } else {
            setSession(value);
          }
        });
      });
    } catch {
      setError("failed to get server");
    } finally {
      setIsLoading(false);
    }
  }, [error]);

  return { session, isLoading };
};
