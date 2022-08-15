import React from "react";
import styles from "../styles/Form.module.css";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient.js";
import { useState, useEffect } from "react";

function Form() {
  const { data: session } = useSession();
  const [username, setUsername] = useState();

  useEffect(() => {
    if (session) {
      setUsername(session?.user?.username);
    }
  }, [session]);

  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = async (data) => {
    const frm = document.getElementsByName("product-form")[0];
    frm.reset();
    data["user"] = username;
    console.log(data);
    await supabase.from("Items").insert([data]);
  };

  return (
    <div className={`${styles.formBorder}`}>
      <div className="row justify-content-center my-5">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit(onSubmit)} name="product-form">
            <label htmlFor="name">Product Name</label>
            <input
              className="form-control mb-4"
              type="text"
              id="name"
              name="name"
              {...register("name", { required: true })}
            />
            <label htmlFor="price">Price</label>
            <input
              className="form-control mb-4"
              type="number"
              id="price"
              name="price"
              step="0.01"
              {...register("price", { required: true })}
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              className="form-control mb-4"
              type="number"
              id="quanity"
              name="quantity"
              {...register("quantity", { required: true })}
            />
            <div className="mb-4 text-center">
              <button
                type="submit"
                className="btn btn-outline-info text-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
