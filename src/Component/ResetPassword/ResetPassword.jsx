

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
const  navigate = useNavigate()

    const validationSchema = Yup.object({
        email:Yup.string().email('Email is invalid').required('Email Is Required'),
        newPassword:Yup.string().min(6, 'Min Length 6 ').required('Password is Required'),
    })

 async function resetPass(values){
        const {data}= await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values);
       if(data.token){
            navigate('/signIn')
        }
    
         
        }
        const formik = useFormik({
            initialValues:{
             email:'',
             newPassword: ''
                
            },validationSchema,
            onSubmit:resetPass
        })
        
      return <>
      <h2>ResetPassword</h2>
      <form className='w-75 auto mx-auto my-5' onSubmit={formik.handleSubmit}>
      
         
        <label htmlFor="email" className='fw-bolder'>Email : </label>
        <input type="email" name="email" id="email" className='form-control my-3' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}/>
    
        <label htmlFor="newPassword" className='fw-bolder'>newPassword : </label>
        <input type="password" name="newPassword" id="newPassword" className='form-control my-3' onBlur={formik.handleBlur} value={formik.values.newPassword} onChange={formik.handleChange}/>
    
    
        <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn bg-main text-light'>Login</button>
      </form> 
    
      </>
    }

