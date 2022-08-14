import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabaseClient.js";
import styles from "../styles/Retrieve.module.css";

function RetrievePage() {

    //Checks for permission to access the page
    const { data: session } = useSession();
    const user = session.user.username;

    const [posts, setPosts] = useState([]);

    // Interdeterministic
    useEffect( () => {
        // useCallBack
        fetchdata()
        // can disable 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Memoized function
    // Set user as dependency variable from memoized function
    // Memo gets passed into fetchdata
    const fetchdata = useCallback( async () => {
        // SQL Select items that the user inputted 
        const { data, error } = await supabase
        .from('Items')
        .select()
        .eq('user', user)
        console.log(data)
        setPosts(data);
    }, [user])

    // async function fetchdata() {
    //     // SQL Select items that the user inputted 
    //     const { data, error } = await supabase
    //     .from('Items')
    //     .select()
    //     .eq('user', user)
    //     console.log(data)
    //     setPosts(data);
    // }

    //
    return (
        <div className="App">
            <table className={styles.retrievetable}>
                <th className={styles.retrieveth}>Item</th>
                <th className={styles.retrieveth}>Price</th>
                <th className={styles.retrieveth}>Quantity</th>
            </table>
            
            {posts.map(post => (
                // Post id passed in as string -> read the id 
                // No more duplicate key warning
                <div key={post.id}>
                    <table className={styles.retrievetable}>
                        <tr className={styles.itemRow}>
                            <td className={styles.retrieveth}>{post.name}</td>
                            <td className={styles.retrieveth}> {post.price}</td>
                            <td className={styles.retrieveth}>{post.quantity}</td>
                        </tr>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default RetrievePage;