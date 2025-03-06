"use server";
import { Organization } from "@prisma/client";
import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { UserSessionType } from "../../types";

export type CustomeJWTPayload = JWTPayload & UserSessionType;

const signJasonWebToken = async (
  organization: Organization,
): Promise<string> => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new SignJWT({
    orgId: organization.id,
    orgEmail: organization.email,
    orgName: organization.name,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);

  return jwt;
};

const verifyJWTToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
};

const getJWTPayload = async (
  token: string,
): Promise<CustomeJWTPayload | undefined> => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const result = await jwtVerify(token, secret);
  return result.payload as CustomeJWTPayload;
};

const setCookies = async (jwtToken: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "session",
    value: jwtToken,
    secure: true,
    sameSite: true,
    httpOnly: true,
    maxAge: 43200,
  });
};

export const setSession = async (organization: Organization) => {
  const jwtToken = await signJasonWebToken(organization);
  await setCookies(jwtToken);
};

export const getSession = async (): Promise<CustomeJWTPayload | undefined> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  const sessionToken = sessionCookie?.value;
  if (!sessionToken) {
    return;
  }
  const isVerified = await verifyJWTToken(sessionToken);
  if (isVerified) {
    const payload = await getJWTPayload(sessionToken);
    return payload;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  const session = await getSession();
  if (session) {
    return true;
  } else {
    return false;
  }
};
