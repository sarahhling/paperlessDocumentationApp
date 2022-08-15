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
  const current_user = username;
  const redStyle = { color: 'red' };

  const onSubmit = async (data) => {
    data["user"] = current_user;
    console.log(data);
    await supabase.from("Items").insert(data);
  };
  const onError = (errors, e) => {
    console.log(errors, e)
    console.log("error")
  };
  
  return (
    <div className={`${styles.formBorder}`}>
      <div className="row justify-content-center my-5">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
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
            {errors.name && <p style={ redStyle }>Please check Product Name</p>}

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
            {errors.price && <p style={ redStyle }>Please check Price</p>}

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
            {errors.quantity && <p style={ redStyle }>Please check Quantity</p>}

            <div className="mb-4 text-center">
              <button className="btn btn-outline-info" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function LoadingPage() {
  return <></>;
}
