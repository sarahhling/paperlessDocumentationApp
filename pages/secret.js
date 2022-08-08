import { signOut, signIn, useSession } from "next-auth/react";

const welcomeTitle = { textAlign: "center" };

export default function secretPage() {
  const { data: session, status } = useSession();

  return (
    <div className="container pt-5 text-center">
      {status === "authenticated" ? accessAllowed(session) : accessDenied()}
    </div>
  );
}

function accessAllowed(session) {
  return (
    <>
      <div className="col-md-12 text-center">
        <h1 style={welcomeTitle}>This is a secret page!</h1>
      </div>
      <div className="col-md-12 text-center pt-3">
        <p>The secret is that there is no secret.</p>
      </div>
    </>
  );
}
function accessDenied() {
  return (
    <>
      <div className="col-md-12 text-center">
        <h1 style={welcomeTitle}>You Need To Be Signed In To See The Secret</h1>
      </div>
      <div className="col-md-12 text-center pt-3">
        <button
          className="btn btn-outline-info"
          type="button"
          onClick={() => signIn({ callbackUrl: "/pages/secretPage" })}
        >
          Log In
        </button>
      </div>
    </>
  );
}
