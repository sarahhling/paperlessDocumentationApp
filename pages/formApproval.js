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
    const fetchdata = async () => {
      const { data, error } = await supabase
        .from("Items")
        .select()
        .is("approved", null)
        .order("user", { ascending: true });
      setPosts(data);
    };
    fetchdata();
  }, []);

  //fetch rows move inside of useeffect at top?

  //update row as approved

  return (
    <div className="App">
      <div className="col-md-12 pb-4 text-center">
        <h1>Form Approval</h1>
      </div>
      <table className={styles.retrieveTable}>
        <thead>
          <tr className={styles.retrieveTableRow}>
            <th className={styles.retrieveTableHead}>Date</th>
            <th className={styles.retrieveTableHead}>Submitted By</th>
            <th className={styles.retrieveTableHead}>Item</th>
            <th className={styles.retrieveTableHead}>Price</th>
            <th className={styles.retrieveTableHead}>Quantity</th>
            <th className={styles.retrieveTableHead}>Approve</th>
          </tr>
        </thead>
      </table>

      {posts.map((post) => (
        <div key={post.id}>
          <table className={styles.retrieveTable}>
            <tbody>
              <tr className={styles.itemRow}>
                <td className={styles.retrieveTableData}>{post.date}</td>
                <td className={styles.retrieveTableData}>{post.user}</td>
                <td className={styles.retrieveTableData}>{post.name}</td>
                <td className={styles.retrieveTableData}> {post.price}</td>
                <td className={styles.retrieveTableData}>{post.quantity}</td>
                <td className={styles.retrieveTableData}>
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
