import { signOut, signIn, useSession } from "next-auth/react";

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
  console.log(session);

  return (
    <>
      <div className="col-md-12 text-center">
        <h1 style={welcomeTitle}>Welcome {session.user.firstName}!</h1>
      </div>
      <div className="col-md-12 text-center pt-3">
        <button
          className="btn btn-outline-info"
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
