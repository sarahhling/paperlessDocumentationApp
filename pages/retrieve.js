import React from 'react';
import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabaseClient.js";

function RetrievePage() {
    //Checks for permission to access the page
    const { data: session } = useSession();
    const user = session.user.username;

    async function fetchdata() {
        const { data, error } = await supabase
        .from('Items')
        .select()
        console.log(data)
    }

    if (user == data.username) {
        //Fetches data from the database
    }

    return (
        <button onClick={fetchdata}>Retrieve Data</button>
    );
}

export default RetrievePage;