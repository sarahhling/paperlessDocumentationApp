import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient.js";

function Title() {
  const titleStyle = { color: "rgb(95, 188, 255)" };
  return (
    <h1 className="text-center" style={titleStyle}>
      Login
    </h1>
  );
}

export function Login() {
  const router = useRouter();
  const [loggedUsername, setUsername] = useState("");
  const [loggedPin, setPin] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [firstName, setFirstName] = useState("");

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
          size="4"
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
              .from("Users")
              .select()
              .match({
                username: loggedUsername,
                pin: loggedPin,
              });
            if (error) {
              setLoginMessage("Something went wrong");
            } else if (data.length == 0) {
              setLoginMessage("Username or pin is incorrect");
            } else {
              router.push(
                {
                  pathname: "/homepage",
                  query: { loginData: data[0]["first_name"] },
                },
                "/homepage"
              );
            }
          }}
        >
          Log In
        </button>
      </div>
      <div className="mt-5 text-center">
        <span className={styles.loginMessage}>{loginMessage}</span>
      </div>
    </div>
  );
}
