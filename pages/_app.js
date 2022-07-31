import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { supabase } from "../utils/supabaseClient.js";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
