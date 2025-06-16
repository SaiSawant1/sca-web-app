"use server";

import { cookies } from "next/headers";
import { ActionState } from "@/lib/create-safe-action";

type InputType = Record<string, never>;
type ReturnType = ActionState<InputType, { success: boolean }>;

export const LogoutAction = async (): Promise<ReturnType> => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return { data: { success: true } };
};

