import React from "react";
import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabaseClient.js";

export default function Retrieve() {
  const { data: session, status } = useSession();

  return status === "authenticated" ? RetrievePage(session) : LoadingPage();
}

function RetrievePage(session) {
  //Checks for permission to access the page
  const user = session.user.username;

  async function fetchdata() {
    const { data, error } = await supabase.from("Items").select();
    console.log(data);
  }

  //   if (session.user.username == data.username) {
  //     //Fetches data from the database
  //   }

  return (
    <div className="col-md-12 text-center pt-3">
      <button
        className="btn btn-outline-info"
        type="button"
        onClick={fetchdata}
      >
        Retrieve Data
      </button>
    </div>
  );
}

function LoadingPage() {
  return <></>;
}
