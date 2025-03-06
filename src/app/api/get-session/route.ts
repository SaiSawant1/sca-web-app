import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/auth/auth-server";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return new NextResponse("Internal server error");
  }

  return NextResponse.json(session);
}
