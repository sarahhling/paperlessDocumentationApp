import React from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient.js";
import { useState, useEffect } from "react";

export default function Form() {
  const { data: session, status } = useSession();
  const { register, handleSubmit, errors, reset } = useForm();
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(session?.user?.username);
  }, [session]);

  return status === "authenticated"
    ? FormPage(username, register)
    : LoadingPage();
}

function FormPage(username, register) {
  const current_user = username;
  console.log(current_user);

  return (
    <form
      onSubmit={async (data) => {
        data["user"] = current_user;
        console.log(data);
        await supabase.from("Items").insert(data);
      }}
    >
      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        id="name"
        name="name"
        {...register("name", { required: true })}
      />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        step="0.01"
        {...register("price", { required: true })}
      />
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        id="quanity"
        name="quantity"
        {...register("quantity", { required: true })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

function LoadingPage() {
  return <></>;
}
