import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "./form.js";

const welcomeTitle = { textAlign: "center" };

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="container pt-5 text-center">
      {status === "authenticated"
        ? HomePage(session, router)
        : status === "loading"
        ? LoadingPage()
        : LoginPage()}
    </div>
  );
}

function HomePage(session, router) {
  return (
    <>
      <div className="col-md-12 text-center">
        <h1 style={welcomeTitle}>Welcome {session.user.firstName}!</h1>
      </div>
      <div className="col-md-12 text-center pt-3">
        <button
          className="btn btn-outline-info m3"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#formModal"
        >
          Send Forms
        </button>

        {session.user.admin ? (
          <button
            className="btn btn-outline-info m-3"
            type="button"
            onClick={() => router.push("/formApproval")}
          >
            Verify Forms
          </button>
        ) : (
          <button
            className="btn btn-outline-info m-3"
            type="button"
            onClick={() => router.push("/retrieve")}
          >
            Retrieve Forms
          </button>
        )}
        <button
          className="btn btn-outline-info m-1"
          type="button"
          onClick={() => signOut({ redirect: false })}
        >
          Log Out
        </button>
        {session.user.admin && (
          <div className="col-md-12 text-center pt-3">
            <button
              className="btn btn-outline-info m3"
              type="button"
              onClick={() => router.push("/admin")}
            >
              Admin Page
            </button>
          </div>
        )}
      </div>

      <div className="modal fade" id="formModal">
        <div className="modal-dialog modal-md">
          <div className="modal-content bg-dark">
            <div className="modal-header border-bottom border-secondary">
              <h5 className="modal-title" id="exampleModalLabel">
                Product Form
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LoginPage() {
  return (
    <>
      <div className="col-md-12 text-center">
        <h1 style={welcomeTitle}>You Are Not Signed In</h1>
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
