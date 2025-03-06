import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth/auth-server";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";

export default async function Home() {
  const session = await getSession();
  if (session) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  } else {
    redirect("/login");
  }
  return <div>Some thing went Wrong</div>;
}
