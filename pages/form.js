import {useForm} from 'react-hook-form';


function Validate() {
    const {register, handleSubmit, errors, reset} = useForm();
    return (
       <form>
            <label for="name">Product Name</label>
            <input type="text" name="name" {...register('test', { required: true })}/>
            <label for="price">Price</label>
            <input type="text" name="price" {...register('test', { required: true })}/>
            <label for="quantity">Quantity</label>
            <input type="number" name="quantity" {...register('test', { required: true })}/>
       </form>
    );

}

export default Validate;