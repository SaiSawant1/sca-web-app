import { Button } from "@/components/ui/button";
import { getSession } from "../../lib/auth/auth-server";

export default async function Home() {
  const session = await getSession();
  if (!session) {
    return <div>No session</div>;
  }
  return (
    <div>
      <Button>Press me</Button>
      <div>{session.orgEmail}</div>
    </div>
  );
}
