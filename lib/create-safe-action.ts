import { z } from "zod";

export type FieldErrors<T> = {
  [k in keyof T]: string[];
};

export type ActionState<Tinput, Toutput> = {
  data?: Toutput;
  error?: string;
  fieldErrors?: FieldErrors<Tinput>;
};

export function CreateSafeAction<Tinput, Toutput>(
  schema: z.Schema<Tinput>,
  handler: (data: Tinput) => Promise<ActionState<Tinput, Toutput>>,
) {
  return async (data: Tinput): Promise<ActionState<Tinput, Toutput>> => {
    const validatedSchema = schema.safeParse(data);
    if (!validatedSchema.success) {
      return {
        fieldErrors: validatedSchema.error.flatten()
          .fieldErrors as FieldErrors<Tinput>,
      };
    }
    return handler(validatedSchema.data);
  };
}
