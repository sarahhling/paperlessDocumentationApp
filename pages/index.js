import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

export default function Homepage() {
  const { data: session } = useSession();

  const name = session ? session["user"]["name"] : "guest";
  console.log("session", session);

  const router = useRouter();
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
            onClick={() => signOut()}
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
