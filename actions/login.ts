"use server";
import { z } from "zod";
import { LoginFormSchema } from "../types";
import prisma from "../lib/prisma";

import { Organization } from "@prisma/client";
import { ActionState, CreateSafeAction } from "../lib/create-safe-action";

export type InputType = z.infer<typeof LoginFormSchema>;

export type ReturnType = ActionState<InputType, Organization>;

async function handler(input: InputType): Promise<ReturnType> {
  const organization = await prisma.organization.findUnique({
    where: {
      email: input.orgEmail,
    },
  });

  if (!organization) {
    return { error: "No Organization found" };
  }

  return { data: organization };
}

export const LoginAction = CreateSafeAction(LoginFormSchema, handler);
