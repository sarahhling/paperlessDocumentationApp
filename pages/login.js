import { useState } from "react";
import styles from "../styles/Login.module.css";
import { supabase } from "../utils/supabaseClient";

export function Title() {
  const titleStyle = { color: "rgb(95, 188, 255)" };
  return (
    <h1 className="text-center" style={titleStyle}>
      Login
    </h1>
  );
}

export function Login() {
  const [loggedUsername, setUsername] = useState("");
  const [loggedPin, setPin] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  return (
    <div className={`container ${styles.loginBorder}`}>
      <div className="mb-3">
        <Title />
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={loggedUsername}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pin" className="form-label">
          PIN (4 Numbers)
        </label>
        <input
          type="password"
          className="form-control"
          id="pin"
          value={loggedPin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>
      <div className="mt-5 text-center">
        <button
          className="btn btn-outline-info"
          type="button"
          onClick={async (context) => {
            context.preventDefault();
            const { data, error } = await supabase
              .from("login-demo")
              .select("username, pin")
              .match({
                username: loggedUsername,
                pin: loggedPin,
              });
            if (error) {
              setLoginMessage("Username or password is incorrect");
            } else {
              setLoginMessage("SUCCESS");
            }
          }}
        >
          Log In
        </button>
      </div>
      <span className={styles.loginMessage}>{loginMessage}</span>
    </div>
  );
}
