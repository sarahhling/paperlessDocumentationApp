import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Logo from "../components/logo.js";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Logo pic={"/logo.png"} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
