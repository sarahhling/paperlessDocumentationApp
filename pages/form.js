import {useForm} from 'react-hook-form';


function Validate() {
    const {register, handleSubmit, errors, reset} = useForm();
    return (
       <form>
            <label for="name">Product Name</label>
            <input type="text" name="name" ref={register({required: true})}/>
            <label for="price">Price</label>
            <input type="text" name="price" ref={register({required: true})}/>
            <label for="quantity">Quantity</label>
            <input type="number" name="quantity" ref={register({required: true})}/>
       </form>
    );

}

export default Validate;