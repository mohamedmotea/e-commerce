
import React, { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Helmet} from "react-helmet";
export default function ForgotPassword() {
    const navigate = useNavigate()
    const [msg,setMsg]=useState(null)

    const validationSchema = Yup.object({
        email:Yup.string().email('Email is invalid').required('Email Is Required')
    })

  async  function sendCode(values){
        const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values).catch((error)=> setMsg(error.response.data.message));
          if(data.statusMsg === 'success'){
             setMsg(data.message)
             document.querySelector('#verify').classList.replace('d-none','d-block')
        }
    }
    const formik = useFormik({
        initialValues:{
            email:''
        },validationSchema,
        onSubmit:sendCode
    })
    


    async function verifyCode(values){
        const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
        if(data.status === 'Success'){
           navigate('/resetpassword')
        }
    }
    const formikCode = useFormik({
        initialValues:{
            resetCode:''
        },
        onSubmit:verifyCode
    })

  return <>  <Helmet>
           
  <title>Forgot Password</title>

</Helmet>
   <h2>ForgotPassword</h2>

  <form className='w-75 auto mx-auto my-5' onSubmit={formik.handleSubmit}>
       {msg !==null ? <div className="alert alert-primary p-2 text-center">{msg}</div> : null}
     
    <label htmlFor="email" className='fw-bolder'>Email : </label>
    <input type="email" name="email" id="email" className='form-control my-3' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}/>
    <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn bg-main text-light'>Send Code</button>
  </form> 


  <div id='verify' className='d-none'>
  
  <h2>Enter Code Verify</h2>

<form className='w-75 auto mx-auto my-5' onSubmit={formikCode.handleSubmit}>

   
  <label htmlFor="resetCode" className='fw-bolder'>Code : </label>
  <input type="text" name="resetCode" id="resetCode" className='form-control my-3' onBlur={formikCode.handleBlur} value={formikCode.values.resetCode} onChange={formikCode.handleChange}/>
  <button type='submit' className='btn bg-main text-light'>Verify Code</button>
</form>
  </div>
  </>
}