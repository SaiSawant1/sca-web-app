"use client";

import { useCallback, useState } from "react";
import { ActionState, FieldErrors } from "../lib/create-safe-action";

type Action<Tinput, Toutput> = (
  data: Tinput,
) => Promise<ActionState<Tinput, Toutput>>;

interface UseActionOptions<Toutput> {
  onSuccess?: (data: Toutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export function useSafeAction<Tinput, Toutput>(
  action: Action<Tinput, Toutput>,
  options: UseActionOptions<Toutput>,
) {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<Tinput> | undefined
  >();
  const [data, setData] = useState<Toutput | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: Tinput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) {
          return;
        }
        if (result.error) {
          setError(result.error);
          options?.onError?.(result.error);
        }
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        if (result.data) {
          setData(result.data);
          options?.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options?.onComplete?.();
      }
    },
    [action, options],
  );

  return { data, isLoading, error, fieldErrors, execute };
}
