import styles from "../styles/Login.module.css";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";

function Title() {
  const titleStyle = { color: "rgb(95, 188, 255)" };
  return (
    <div className="mb-3">
      <h1 className="text-center" style={titleStyle}>
        Login
      </h1>
    </div>
  );
}

function Error({ errorMessage }) {
  const errorStyle = { color: "red", textAlign: "center" };
  return (
    <div className="mb-3">
      <p style={errorStyle}>{errorMessage}</p>
    </div>
  );
}

export default function Login({ csrfToken }) {
  const { error } = useRouter().query;
  return (
    <div className={`container ${styles.loginBorder}`}>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Title />
        {error && <Error errorMessage={error} />}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pin" className="form-label">
            PIN (4 Numbers)
          </label>
          <input
            type="password"
            className="form-control"
            name="pin"
            size="4"
            required
          />
        </div>
        <div className="mt-5 text-center">
          <button className="btn btn-outline-info" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
