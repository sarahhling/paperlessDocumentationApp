import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const name = session ? session["user"]["firstName"] : "guest";

  const welcomeTitle = { textAlign: "center" };

  return (
    <div className="container pt-5">
      <div className="col-md-12 text-center">
        <h1 style={welcomeTitle}>Welcome {name}</h1>
      </div>
      <div className="col-md-12 text-center pt-3">
        {session ? (
          <button
            className="btn btn-outline-info"
            type="button"
            onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
          >
            Log Out
          </button>
        ) : (
          <button
            className="btn btn-outline-info"
            type="button"
            onClick={() => router.push("api/auth/signin")}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
}
