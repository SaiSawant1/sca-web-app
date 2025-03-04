import { z } from "zod";

export const SignupFormSchema = z.object({
  orgName: z.string().min(1),
  orgEmail: z.string().min(1),
  password: z.string().min(8),
});

export const LoginFormSchema = z.object({
  orgEmail: z.string().min(1),
  password: z.string().min(8),
});
