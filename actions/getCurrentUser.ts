"use server";
import { getSession } from "../lib/auth/auth-server";
import prisma from "../lib/prisma";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  return prisma.organization.findUnique({
    where: { id: session.orgId },
    select: {
      name: true,
      email: true,
      address: true,
    },
  });
} 