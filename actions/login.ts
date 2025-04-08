"use server";
import { z } from "zod";
import { LoginFormSchema } from "../types";
import prisma from "../lib/prisma";
import { Organization } from "@prisma/client";
import bcrypt from "bcryptjs";
import { setSession } from "../lib/auth/auth-server";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof LoginFormSchema>;
export type ReturnType = ActionState<InputType, Organization>;

async function handler(input: InputType): Promise<ReturnType> {
  if (!input.orgEmail) {
    return { error: "Please Provide Email." };
  }
  const organization = await prisma.organization.findUnique({
    where: {
      email: input.orgEmail,
    },
  });

  if (!organization) {
    return { error: "No Organization found" };
  }
  const isSimilar = await bcrypt.compare(input.password, organization.password);
  if (!isSimilar) {
    return { error: "Incorrect Password." };
  }

  await setSession(organization);
  return { data: organization };
}

export const LoginAction = createSafeAction(LoginFormSchema, handler);
