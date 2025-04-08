"use server";
import { z } from "zod";
import { SignupFormSchema } from "../types";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import { Organization } from "@prisma/client";
import { setSession } from "../lib/auth/auth-server";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof SignupFormSchema>;
export type ReturnType = ActionState<InputType, Organization>;

async function handler(input: InputType): Promise<ReturnType> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(input.password, salt);
  const organization = await prisma.organization.create({
    data: {
      email: input.orgEmail,
      name: input.orgName,
      password: hashedPassword,
    },
  });

  if (!organization) {
    return { error: "Failed to Signup." };
  }

  await setSession(organization);
  return { data: organization };
}

export const SignupAction = createSafeAction(SignupFormSchema, handler);
