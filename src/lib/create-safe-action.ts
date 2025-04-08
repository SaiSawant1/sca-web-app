import { z } from "zod";

export type ActionState<TInput, TOutput> = {
  fieldErrors?: {
    [K in keyof TInput]?: string[];
  };
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>,
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten().fieldErrors as {
          [K in keyof TInput]?: string[];
        },
      };
    }

    return handler(validationResult.data);
  };
};

