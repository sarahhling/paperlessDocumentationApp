import React from "react";
import styles from "../styles/Form.module.css";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient.js";
import { useState, useEffect } from "react";

export default function Form() {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(session?.user?.username);
  }, [session]);

  return status === "authenticated"
    ? FormPage(username, register, handleSubmit, errors, reset)
    : LoadingPage();
}

function FormPage(username, register, handleSubmit, errors, reset) {
  const [formState, setFormState] = useState(undefined);
  const current_user = username;

  const onSubmit = async (data, e) => {
    data["user"] = current_user;

    // if submission hasn't been checked,
    // check in Supabase if there is already a form submission with the same "date" in the Items table
    if (formState?.type != "warning" || data.date != formState?.message) {
      const items = await supabase
        .from("Items")
        .select("date")
        .match({ date: data.date });

      if (items.body.length > 0) {
        setFormState({
          type: "warning",
          message: data.date,
        });
        console.log(
          "Form with the same date already exists",
          items.body.length,
          "times"
        );
        return;
      }
    }

    let { error: submitError } = await supabase.from("Items").insert(data);
    if (submitError) {
      console.log("Upload/Submit Error: ", submitError);
      setFormState({ type: "error", submitError });
      //throw submitError;
    } else {
      setFormState({ type: "success" });
    }
    reset();
  };
  const onError = (errors, e) => {
    console.log("From fields error:", errors);
    //setFormState({ type: 'error', errors });
  };

  return (
    <div className="row justify-content-center my-5">
      <div className="col-lg-8">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {formState?.type === "warning" && (
            <div className="alert alert-warning" role="alert">
              A submission with the date &quot;{formState.message}&quot; already
              exists. Click Submit again to confirm & continue.
            </div>
          )}
          {formState?.type === "error" && (
            <div className="alert alert-danger" role="alert">
              Cannot submit form to server, please try again later.
            </div>
          )}
          {formState?.type === "success" && (
            <div className="alert alert-success" role="alert">
              Form submission successful!
            </div>
          )}

          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            className="form-control mb-4"
            type="date"
            id="date"
            name="date"
            {...register("date", { required: true })}
          />
          {errors.date && <p className="text-danger">Please check Date</p>}

          <label className="form-label" htmlFor="name">
            Product Name
          </label>
          <input
            className="form-control mb-4"
            type="text"
            id="name"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-danger">Please check Product Name</p>
          )}

          <label className="col-form-label" htmlFor="price">
            Price
          </label>
          <input
            className="form-control mb-4"
            type="number"
            id="price"
            name="price"
            step="0.01"
            {...register("price", { required: true })}
          />
          {errors.price && <p className="text-danger">Please check Price</p>}

          <label className="form-label" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="form-control mb-4"
            type="number"
            id="quanity"
            name="quantity"
            {...register("quantity", { required: true })}
          />
          {errors.quantity && (
            <p className="text-danger">Please check Quantity</p>
          )}

          <div className="mb-4 text-center">
            <button className="btn btn-outline-info" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LoadingPage() {
  return <></>;
}
