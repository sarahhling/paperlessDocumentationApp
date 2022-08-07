import React from 'react';
import { supabase } from "../utils/supabaseClient.js";

function RetrievePage() {
    //Checks for permission to access the page
    async function fetchdata() {
        const { data, error } = await supabase
        .from('Items')
        .select()
        console.log(data)
    }
    return (
        <button onClick={fetchdata}>Retrieve Data</button>
    );
}

export default RetrievePage;