import { NextRequest, NextResponse } from "next/server";
import {
  API_AUTH_PREFIX,
  DEFAULT_LOGIN_REDIRECT,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
} from "../routes";
import { getSession } from "../lib/auth/auth-server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(path);
  const isProtectedRoute = PROTECTED_ROUTES.includes(path);
  const session = await getSession();
  const isApiRoute = path.startsWith(API_AUTH_PREFIX);

  if (isApiRoute) {
    return NextResponse.next();
  }
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
  }

  return NextResponse.next();
}
