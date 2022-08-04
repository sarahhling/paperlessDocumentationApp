import React from 'react';
import {useForm} from 'react-hook-form';
import { supabase } from "../utils/supabaseClient.js";


  

function Validate() {
    const {register, handleSubmit, errors, reset} = useForm();
    return (
       <form>
            <label for="name">Product Name</label>
            <input type="text" id="name" name="name" {...register('productName', { required: true, maxLength: 100 })}/>
            <label for="price">Price</label>
            <input type="number" id= "price" name="price" {...register('productPrice', { required: true })}/>
            <label for="quantity">Quantity</label>
            <input type="number" id="quanity" name="quantity" {...register('productQuantity', { required: true })}/>
            <button type="submit">Submit</button>
       </form>
    );

}

export default Validate;