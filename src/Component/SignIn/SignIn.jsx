
import React,{useState,useContext} from 'react'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserToken } from '../../Context/Token';

export default function SignIn() {
    const navigate = useNavigate();
    const [spinner,setSpinner] = useState(false)
    const [error,setError] = useState(null)
    const {setToken} = useContext(UserToken)
    const {setUserName} = useContext(UserToken)

    let validationSchema = Yup.object({
      
        email:Yup.string().email('Email is invalid').required('Email is Required'),
     
        password:Yup.string().min(6, 'Min Length 6 ').required('Password is Required'),
        
    })

   async function registerSubmit(values){
    setSpinner(true)
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((error)=> {
            setSpinner(false)
            setError(error.response.data.message)
    
        })
        if(data.message === 'success'){
            setSpinner(false)
            localStorage.setItem('userToken',data.token)
            localStorage.setItem('userName',data.user.name)
            setToken(data.token)
            setUserName(data.user.name)
            navigate('/home')
        }
        
       
    }

    const formik = useFormik({
        
        initialValues:{
            email:'',
            password:'',
        },validationSchema,
        onSubmit:registerSubmit
    })

  return <>
  <h5>Sign Now :</h5>

  <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-4'>
    {error ?   <div className='alert alert-danger p-2 my-3'>{error}</div> : null}


    <label htmlFor="email">Email : </label>
    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className='form-control my-3' />
    {formik.touched.email && formik.errors.email ? <div className='alert alert-danger p-2'>{formik.errors.email}</div> :null}




    <label htmlFor="password">Password : </label>
    <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className='form-control my-3' />
    {formik.touched.password && formik.errors.password ? <div className='alert alert-danger p-2'>{formik.errors.password}</div> :null}


    <div className='d-flex justify-content-between'>

    {spinner ? <button type='button' className='btn btn-success'> <i className="fa-solid fa-spinner px-3"></i> </button>  : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success'>SignIn</button> }

    <Link to='/forgotpassword'>Forgot Password ?</Link>

    </div>


  </form>
  </>
}