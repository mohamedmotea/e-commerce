
import { useState } from 'react'

import axios from 'axios'
import { useQuery } from 'react-query'
import {Helmet} from "react-helmet";

export default function Categories() {
    const [sub,setSub]= useState([])
    const [subName,setSubName]= useState(null)
    const [isLoad,setIsLoad]= useState(false)

     function getCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((response)=>response).catch((error)=>error)
    }

    const {data}= useQuery('Categories',getCategories)
  
    function getSpecificCategor(id){
       axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`).then((response)=> {
            setIsLoad(true)
            setSub(response.data.data)
            setIsLoad(false)
        }).catch((error)=>error)

     
        
  
    } 


  return <>
  <h2>Categories</h2>
  <Helmet>
            
                <title>Categories</title>
            
            </Helmet>

  <div className="row g-4 my-5">

  {data?.data.data.map((cate)=>{return   <div key={cate._id} className="col-md-3">
  
  <div className="product h-100 border py-3 rounded" role='button' onClick={()=> {getSpecificCategor(cate._id) ; setSubName(cate.name)}} >
      <div className="box-img">
          <img src={cate.image} className='w-100' height={300} alt="" />
      </div>
      <div className="box-name text-center fw-bolder my-3 text-main fs-5">
          <p>{cate.name}</p>
      </div>
  </div>
</div>


})}


  </div>



    <h2 className='fw-bolder text-main text-center my-4'>{subName || ''}</h2>

    <div className="row g-4">


    {isLoad ?<div className="w-100 d-flex justify-content-center align-items-center">
  <i className="fa-solid fa-spinner fs-1 text-main"></i>
  </div> : <>
        {sub?.map((subCate)=>{return     <div key={subCate._id} className="col-md-4">
        <div className="product text-center border py-3">
            <h5>{subCate.name.split(' ').slice(0,3).join(' ')}</h5>
        </div>
        </div>})}
    </>}

    </div>

  </>
}