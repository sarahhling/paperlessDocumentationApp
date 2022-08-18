import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabaseClient.js";
import styles from "../styles/Retrieve.module.css";
import ApprovalButtons from "../components/approvalButtons.js";

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

  //fetch rows move inside of useeffect at top?
  const fetchdata = useCallback(async () => {
    const { data, error } = await supabase
      .from("Items")
      .select()
      .is("approved", null)
      .order("user", { ascending: true });
    setPosts(data);
  }, []);

  //update row as approved

  return (
    <div className="App">
      <div className="col-md-12 pb-4 text-center">
        <h1>Form Approval</h1>
      </div>
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
                  <div style={{ display: "inline-block" }}>
                    <ApprovalButtons data={post} user={username} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
