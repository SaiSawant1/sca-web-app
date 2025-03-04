"use server";
import { z } from "zod";
import { SignupFormSchema } from "../types";
import prisma from "../lib/prisma";

import { Organization } from "@prisma/client";
import { ActionState, CreateSafeAction } from "../lib/create-safe-action";

export type InputType = z.infer<typeof SignupFormSchema>;

export type ReturnType = ActionState<InputType, Organization>;

async function handler(input: InputType): Promise<ReturnType> {
  const organization = await prisma.organization.create({
    data: {
      email: input.orgEmail,
      name: input.orgName,
      password: input.password,
    },
  });

  return { data: organization };
}

export const SignupAction = CreateSafeAction(SignupFormSchema, handler);
