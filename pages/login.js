import styles from "../styles/Login.module.css";
import { getCsrfToken } from "next-auth/react";

function Title() {
  const titleStyle = { color: "rgb(95, 188, 255)" };
  return (
    <h1 className="text-center" style={titleStyle}>
      Login
    </h1>
  );
}

export default function Login({ csrfToken }) {
  return (
    <div className={`container ${styles.loginBorder}`}>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="mb-3">
          <Title />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" name="username" />
        </div>
        <div className="mb-3">
          <label htmlFor="pin" className="form-label">
            PIN (4 Numbers)
          </label>
          <input type="password" className="form-control" name="pin" size="4" />
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
