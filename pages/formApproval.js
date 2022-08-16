import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabaseClient.js";
import styles from "../styles/Retrieve.module.css";

export default function FormApprovalPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState();

  useEffect(() => {
    if (session) {
      setUsername(session?.user?.username);
    }
  }, [session]);

  // Interdeterministic
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = useCallback(async () => {
    const { data, error } = await supabase
      .from("Items")
      .select()
      .filter("approved", "in", '("false")')
      .order("user", { ascending: true });
    setPosts(data);
  }, []);

  function setApproved(form) {
    console.log("approving");
    console.log(form);
  }

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
        <thead>
          <tr>
            <th className={styles.retrieveth}>Item</th>
            <th className={styles.retrieveth}>Price</th>
            <th className={styles.retrieveth}>Quantity</th>
            <th className={styles.retrieveth}>Approve</th>
          </tr>
        </thead>
      </table>

      {posts.map((post) => (
        // Post id passed in as string -> read the id
        // No more duplicate key warning
        <div key={post.id}>
          <table className={styles.retrievetable}>
            <tbody>
              <tr className={styles.itemRow}>
                <td className={styles.retrieveth}>{post.name}</td>
                <td className={styles.retrieveth}> {post.price}</td>
                <td className={styles.retrieveth}>{post.quantity}</td>
                <td className={styles.retrieveth}>
                  <button
                    className="btn btn-outline-info m-3"
                    type="button"
                    onClick={() => setApproved(post)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
