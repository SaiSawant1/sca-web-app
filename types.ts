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

export const UserSessionSchema = z.object({
  orgId: z.string(),
  orgName: z.string(),
  orgEmail: z.string().email(),
});

export type UserSessionType = z.infer<typeof UserSessionSchema>;

import { Prisma } from "@prisma/client";

export const productWithOrg = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    organization: true,
  },
});

export type ProductWithOrganization = Prisma.ProductGetPayload<
  typeof productWithOrg
>;
