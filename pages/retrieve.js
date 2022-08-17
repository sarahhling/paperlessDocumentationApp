import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabaseClient.js";
import styles from "../styles/Retrieve.module.css";

export default function RetrievePage() {
  //Checks for permission to access the page
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState();

  function IsApproved(props) {
    const isApproved = props.approved;
    const yesStyle = { color: 'green'};
    const noStyle = {color: 'red'}
    if (isApproved) {
      return <h3 style={ yesStyle }>YES</h3>
    }

    else {
      return <h3 style={ noStyle }>NO</h3>
    }
  }

  useEffect(() => {
    if (session) {
      setUsername(session?.user?.username);
    }
  }, [session]);

  // Interdeterministic
  useEffect(() => {
    // useCallBack
    fetchdata();
    // can disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  // Memoized function
  // Set user as dependency variable from memoized function
  // Memo gets passed into fetchdata
  const fetchdata = useCallback(async () => {
    // SQL Select items that the user inputted
    if (username) {
      const { data, error } = await supabase
        .from("Items")
        .select()
        .eq("user", username);
      console.log(data);
      setPosts(data);
    }
  }, [username]);
  return (
    <div className="App">
      <table className={styles.retrievetable}>
        <thead>
          <tr>
            <th className={styles.retrieveth}>Item</th>
            <th className={styles.retrieveth}>Price</th>
            <th className={styles.retrieveth}>Quantity</th>
            <th className={styles.retrieveth}>Approved</th>
          </tr>
        </thead>
      </table>

      {posts.map((post) => (
        // Post id passed in as string -> read the id
        // No more duplicate key warning]
        <div key={post.id}>
          <table className={styles.retrievetable}>
            <tbody>
              <tr className={styles.itemRow}>
                <td className={styles.retrieveth}>{post.name}</td>
                <td className={styles.retrieveth}> {post.price}</td>
                <td className={styles.retrieveth}>{post.quantity}</td>
                <td className={styles.retrieveth}>{IsApproved(post)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
