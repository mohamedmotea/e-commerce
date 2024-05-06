
import  { useContext } from 'react'

import { useFormik } from 'formik'
import { useQuery } from "react-query";
import { CartContext } from '../../Context/Cart';

export default function CheckOut() {


  const { displayCart ,cashOrder,checkoutsession} = useContext(CartContext);
  const { data } = useQuery("carts", displayCart);
  
  function checkoutNow (values){

    checkCash(data?.data.data._id,values)
  }
async  function checkCash(id,shipp){
  const response = await checkoutsession(id,shipp);
  if(response.data.status === "success"){
     await cashOrder(id,shipp)
    window.location.href = response.data.session.url
  }
}

  const formik = useFormik({
    initialValues:{
      details: "",
      phone: "",
      city: ""
    },
    onSubmit:checkoutNow
  })
  return <>
  <h2>CheckOut</h2>


  <form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>

    <label htmlFor="details">Details : </label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} className='form-control my-3' type="text" name="details" id="details" placeholder='Your Details' />


    <label htmlFor="phone">Phone : </label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className='form-control my-3' type="tel" name="phone" id="phone" placeholder='Your phone' />

    <label htmlFor="city">City : </label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} className='form-control my-3' type="text" name="city" id="city" placeholder='Your city' />


  <button type='submit' className='w-100 btn text-main bg-main-light'>Pay Now</button>
  </form>
  </>
}