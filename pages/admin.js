import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (session) {
      setAdmin(session?.user?.admin);
    }
  }, [session]);

  return (
    <div className="text-center pt-4">
      {status === "authenticated" ? (
        admin ? (
          <h1>Welcome, Admin</h1>
        ) : (
          <>
            <h1>Welcome, Intruder</h1>
            <p>You do not have permission to view this page</p>
          </>
        )
      ) : (
        LoadingPage()
      )}
    </div>
  );
}

function LoadingPage() {
  return <></>;
}
