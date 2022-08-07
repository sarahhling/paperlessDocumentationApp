import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="container pt-5 text-center">
      {session ? HomePage(session) : LoginPage()}
    </div>
  );
}

function HomePage({ session }) {
  const welcomeTitle = { textAlign: "center" };

  return (
    <>
      <div className="col-md-12 text-center">
        <h1 style={welcomeTitle}>Welcome {session}!</h1>
      </div>
      <div className="col-md-12 text-center pt-3">
        <button
          className="btn btn-outline-info"
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Log Out
        </button>
      </div>
    </>
  );
}
function LoginPage() {
  const router = useRouter();

  return (
    <button
      className="btn btn-outline-info"
      type="button"
      onClick={() => signIn()}
    >
      Log In
    </button>
  );
}
