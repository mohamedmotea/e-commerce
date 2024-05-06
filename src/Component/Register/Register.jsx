
import  { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// https://documenter.getpostman.com/view/5709532/2s93JqTRWN
export default function Register() {
    const navigate = useNavigate();
    const [spinner,setSpinner] = useState(false)
    const [error,setError] = useState(null)

    let regPhone = /^01[0-2||5][\d]{8}$/
    let validationSchema = Yup.object({
        name:Yup.string().min(3 , 'Min Length 3').max(10,'Max Length 10').required('Name is Required'),
        email:Yup.string().email('Email is invalid').required('Email is Required'),
        phone:Yup.string().matches(regPhone , 'invalid phone').required('Phone is Required'),
        password:Yup.string().min(6, 'Min Length 6 ').required('Password is Required'),
        rePassword:Yup.string().oneOf([Yup.ref('password')],'Password is not matched').required('rePassword is Required'),
    })

   async function registerSubmit(values){
    setSpinner(true)
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((error)=> {
            setSpinner(false)
            setError(error.response.data.message)
        })
        if(data.message === 'success'){
            setSpinner(false)
            // localStorage.setItem('userToken',data.token)
            // setToken(data.token)
            navigate('/signIn')

        }

    }

    const formik = useFormik({
        
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:''
        },validationSchema,
        onSubmit:registerSubmit
    })

  return <>
  <h5>Register Now :</h5>

  <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-4'>
    {error ?   <div className='alert alert-danger p-2 my-3'>{error}</div> : null}

    <label htmlFor="name">Name : </label>
    <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="name" className='form-control my-3' />
    {formik.touched.name && formik.errors.name ? <div className='alert alert-danger p-2'>{formik.errors.name}</div> :null}


    <label htmlFor="email">Email : </label>
    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className='form-control my-3' />
    {formik.touched.email && formik.errors.email ? <div className='alert alert-danger p-2'>{formik.errors.email}</div> :null}



    <label htmlFor="phone">Phone : </label>
    <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className='form-control my-3' />
    {formik.touched.phone && formik.errors.phone ? <div className='alert alert-danger p-2'>{formik.errors.phone}</div> :null}


    <label htmlFor="password">Password : </label>
    <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className='form-control my-3' />
    {formik.touched.password && formik.errors.password ? <div className='alert alert-danger p-2'>{formik.errors.password}</div> :null}


    <label htmlFor="rePassword">rePassword : </label>
    <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="rePassword" className='form-control my-3' />
    {formik.touched.rePassword && formik.errors.rePassword ? <div className='alert alert-danger p-2'>{formik.errors.rePassword}</div> :null}

    {spinner ? <button type='button' className='btn btn-success'> <i className="fa-solid fa-spinner px-3"></i> </button>  : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success'>Register</button> }

  </form>
  </>
}