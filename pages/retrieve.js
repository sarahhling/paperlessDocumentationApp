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
    const yesStyle = { size:'12px', color: 'green'};
    const noStyle = {color: 'red'};
    const nullStyle = {color: 'grey'};

    if (isApproved) {
      return <p style={ yesStyle }>Approved</p>
    }

    else if (!isApproved) {
      return <p style={ noStyle }>Rejected</p>
      
    } else {
      
    } {
      return <p style={ nullStyle }>Pending</p>
    }
  }

  // Converts the null values in reviewed_by column to text
  function ReviewedBy(props) {
    const isReviewedByNull = props.reviewed_by;

    if (isReviewedByNull == null){
      return "N/A";
    }

    else {
      return isReviewedByNull;
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
      <table className={styles.retrieveTable}>
        <thead>
          <tr>
            <th className={styles.retrieveTableHead}>Item</th>
            <th className={styles.retrieveTableHead}>Price</th>
            <th className={styles.retrieveTableHead}>Quantity</th>
            <th className={styles.retrieveTableHead}>Status</th>
            <th className={styles.retrieveTableHead}>Reviewed By</th>
          </tr>
        </thead>
      </table>

      {posts.map((post) => (
        // Post id passed in as string -> read the id
        // No more duplicate key warning]
        <div key={post.id}>
          <table className={styles.retrieveTable}>
            <tbody>
              <tr className={styles.itemRow}>
                <td className={styles.retrieveTableData}>{post.name}</td>
                <td className={styles.retrieveTableData}> {post.price}</td>
                <td className={styles.retrieveTableData}>{post.quantity}</td>
                <td className={styles.retrieveTableData}>{IsApproved(post)}</td>
                <td className={styles.retrieveTableData}>{ReviewedBy(post)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function LoadingPage() {
  return <></>;
}
