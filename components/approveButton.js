import { useState } from "react";
import { supabase } from "../utils/supabaseClient.js";

export default function ApproveButton({ data, user }) {
  const [buttonText, setButtonText] = useState("Approve");
  const [buttonColor, setButtonColor] = useState("btn-outline-info");
  const [disabled, setDisabled] = useState(false);

  async function handleClick(form, aUser) {
    console.log("clicked");
    console.log(form);
    console.log(aUser);
    const { data, error } = await supabase
      .from("Items")
      .update({ approved: true, approved_by: aUser })
      .match({ id: form.id });
    if (error || data.length == 0) {
      alert("Could not update entry");
      //do a popup instead
    } else {
      setButtonText("Approved");
      setButtonColor("btn-outline-success");
      setDisabled(true);
    }
  }

  return (
    <button
      className={`btn ${buttonColor} m-3`}
      type="button"
      disabled={disabled}
      onClick={() => handleClick(data, user)}
    >
      {buttonText}
    </button>
  );
}
