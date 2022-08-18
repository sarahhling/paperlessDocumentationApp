import { useState } from "react";
import { supabase } from "../utils/supabaseClient.js";

export default function ApprovalButtons({ data, user }) {
  const [rejectButtonText, setRejectButtonText] = useState("Reject");
  const [rejectbuttonColor, setRejectButtonColor] =
    useState("btn-outline-info");
  const [rejectdisabled, setRejectDisabled] = useState(false);
  const [approveButtonText, setApproveButtonText] = useState("Approve");
  const [approveButtonColor, setApproveButtonColor] =
    useState("btn-outline-info");
  const [approveDisabled, setApproveDisabled] = useState(false);
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  async function handleApprove(form, aUser) {
    const { data, error } = await supabase
      .from("Items")
      .update({ approved: true, reviewed_by: aUser })
      .match({ id: form.id });
    if (error || data.length == 0) {
      alert("Could not update entry");
    } else {
      setApproveButtonText("Approved");
      setApproveButtonColor("btn-outline-success");
      setRejectButtonColor("btn-outline-dark");
      setApproveDisabled(true);
      setRejectDisabled(true);
    }
  }

  async function handleReject(form, aUser) {
    const { data, error } = await supabase
      .from("Items")
      .update({ approved: false, reviewed_by: aUser, comments: comment })
      .match({ id: form.id });
    if (error || data.length == 0) {
      alert("Could not update entry");
    } else {
      setRejectButtonText("Rejected");
      setRejectButtonColor("btn-outline-danger");
      setApproveButtonColor("btn-outline-dark");

      setApproveDisabled(true);
      setRejectDisabled(true);
    }
  }

  return (
    <>
      <button
        className={`btn ${approveButtonColor} m-3`}
        type="button"
        disabled={approveDisabled}
        onClick={() => handleApprove(data, user)}
      >
        {approveButtonText}
      </button>
      <button
        className={`btn ${rejectbuttonColor} m-3`}
        type="button"
        disabled={rejectdisabled}
        data-bs-toggle="modal"
        data-bs-target={`#rejectModal${data.id}`}
      >
        {rejectButtonText}
      </button>

      <div className="modal fade" id={`rejectModal${data.id}`}>
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content bg-dark">
            <div className="modal-header border-bottom border-secondary">
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="col-md-12 ">
                <label htmlFor="comment">Reason for Rejection:</label>
              </div>
              <div className="col-md-12 text-center mt-3">
                <textarea
                  type="text"
                  id="comment"
                  name="comment"
                  cols="50"
                  value={comment}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className={`btn btn-outline-danger m-3`}
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#rejectModal${data.id}`}
                onClick={() => handleReject(data, user)}
              >
                Reject Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
