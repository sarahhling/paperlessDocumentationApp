import { useState, useEffect } from "react";
import styles from "./Login.module.css";

export function Login() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  const [loginSuccess, setLoginSuccess] = useState(false);

  return (
    <div className={`container ${styles.loginBorder}`}>
      <div className="mb-3">
        <label for="username" class="form-label">
          Username{" "}
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div class="mb-3">
        <label for="pin" className="form-label">
          PIN (4 Numbers)
        </label>
        <input
          type="password"
          className="form-control"
          id="pin"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>
      <div class="mt-5 text-center">
        <button className="btn btn-outline-info" type="button">
          Log In
        </button>
      </div>
    </div>
  );
}
