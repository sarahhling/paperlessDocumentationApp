import { useState } from "react";

export default function ApproveButton({ buttonFunction }) {
  const [buttonText, setButtonText] = useState("Approve");
  const [buttonColor, setButtonColor] = useState("btn-outline-info");
  const [disabled, setDisabled] = useState(false);

  function handleClick() {
    buttonFunction;
    setButtonText("Approved");
    setButtonColor("btn-outline-success");
    setDisabled(true);
  }

  return (
    <button
      className={`btn ${buttonColor} m-3`}
      type="button"
      disabled={disabled}
      onClick={() => handleClick()}
    >
      {buttonText}
    </button>
  );
}
