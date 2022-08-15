import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  return (
    <div className="text-center pt-4">
      {status === "authenticated" ? <h1>Welcome, Admin</h1> : LoadingPage()}
    </div>
  );
}

function LoadingPage() {
  return <></>;
}
