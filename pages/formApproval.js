import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabaseClient.js";
import styles from "../styles/Retrieve.module.css";
import ApproveButton from "../components/approveButton.js";

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

  //fetch rows
  const fetchdata = useCallback(async () => {
    const { data, error } = await supabase
      .from("Items")
      .select()
      .filter("approved", "in", '("false")')
      .order("user", { ascending: true });
    setPosts(data);
  }, []);

  //update row as approved

  return (
    <div className="App">
      <table className={styles.retrievetable}>
        <thead>
          <tr>
            <th className={styles.retrieveth}>Date</th>
            <th className={styles.retrieveth}>Submitted By</th>
            <th className={styles.retrieveth}>Item</th>
            <th className={styles.retrieveth}>Price</th>
            <th className={styles.retrieveth}>Quantity</th>
            <th className={styles.retrieveth}>Approve</th>
          </tr>
        </thead>
      </table>

      {posts.map((post) => (
        <div key={post.id}>
          <table className={styles.retrievetable}>
            <tbody>
              <tr className={styles.itemRow}>
                <td className={styles.retrieveth}>{post.date}</td>
                <td className={styles.retrieveth}>{post.user}</td>
                <td className={styles.retrieveth}>{post.name}</td>
                <td className={styles.retrieveth}> {post.price}</td>
                <td className={styles.retrieveth}>{post.quantity}</td>
                <td className={styles.retrieveth}>
                  <ApproveButton data={post} user={username} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
