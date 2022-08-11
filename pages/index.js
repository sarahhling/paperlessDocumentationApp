import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const welcomeTitle = { textAlign: "center" };

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="container pt-5 text-center">
      {status === "authenticated"
        ? HomePage(session)
        : status === "loading"
        ? LoadingPage()
        : LoginPage()}
    </div>
  );
}

function HomePage(session) {
  const router = useRouter();
  console.log(session);

  return (
    <>
      <div className="col-md-12 text-center">
        <h1 style={welcomeTitle}>Welcome {session.user.firstName}!</h1>
      </div>
      <div className="col-md-12 text-center pt-3">
        <button
          className="btn btn-outline-info m3"
          type="button"
          onClick={() => router.push("/form")}
        >
          Send Forms
        </button>
        <button
          className="btn btn-outline-info m-3"
          type="button"
          onClick={() => router.push("/retrieve")}
        >
          Retrieve Forms
        </button>
        <button
          className="btn btn-outline-info m-1"
          type="button"
          onClick={() => signOut({ redirect: false })}
        >
          Log Out
        </button>
      </div>
    </>
  );
}

function LoginPage() {
  return (
    <>
      <div className="col-md-12 text-center">
        <h1 style={welcomeTitle}>You Are Not Signed In, Pal</h1>
      </div>
      <div className="col-md-12 text-center pt-3">
        <button
          className="btn btn-outline-info"
          type="button"
          onClick={() => signIn({ callbackUrl: "http://localhost:3000/" })}
        >
          Log In
        </button>
      </div>
    </>
  );
}

function LoadingPage() {
  return <></>;
}
