import { useCallback, useState } from "react";
import { ActionState } from "@/lib/create-safe-action";

/**
 * Action function type
 * It returns a Promise of type ActionState<TInput,TOutput>
 */
type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOption<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOption<TOutput>,
) => {
  const [fieldErrors, setFieldErrors] = useState<
    ActionState<TInput, TOutput>["fieldErrors"]
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);

      try {
        const result = await action(input);

        if (!result) {
          return;
        }

        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options],
  );

  return {
    execute,
    fieldErrors,
    error,
    isLoading,
    data,
  };
};
