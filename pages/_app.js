import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Logo from "../components/logo.js";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // Avoids Bootstrap undefined document issue in NextJs
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  
  return (
    <SessionProvider>
      <Logo pic={"/logo.png"} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;