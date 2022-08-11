import React from 'react';
import { useSession } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { supabase } from "../utils/supabaseClient.js";

function Form() {
    const { data: session } = useSession();
    current_user = session.user.username;

    const {register, handleSubmit, errors, reset} = useForm();
    const onSubmit = async (data) => {
      console.log(data);
      await supabase.from('Items').insert([current_user, data]);
    }
 
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
            <label for="name">Product Name</label>
            <input type="text" id="name" name="name" {...register('name', { required: true })} />
            <label for="price">Price</label>
            <input type="number" id= "price" name="price"  {...register('price', { required: true })} />
            <label for="quantity">Quantity</label>
            <input type="number" id="quanity" name="quantity" {...register('quantity', { required: true })} />
            <button type="submit">Submit</button>
       </form>
    );

}

export default Form;