
import axios from 'axios'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'

import {Helmet} from "react-helmet";

export default function Brands() {


     function getBrands(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands').then((response)=> response).catch((error)=>error)
    }

    const {data}= useQuery('brands',getBrands)


  return <>
  <h2 className='text-center text-main fw-bold'>All Brands</h2>
  <Helmet>
            
                <title>Brands</title>
            
            </Helmet>

  <div className="row g-4 my-5">
    {data?.data.data.map((brand)=>{return   <div key={brand._id} className="col-md-3">
  
        <div className="product h-100 border py-3 rounded" role='button' onClick={()=>   Swal.fire({
               
                text:`${brand.name}`,
               imageUrl:`${brand.image}`,
           
           
          
            }) }>
            <div className="box-img">
                <img src={brand.image} className='w-100' alt="" />
            </div>
            <div className="box-name text-center fw-bolder">
                <p>{brand.name}</p>
            </div>
        </div>
    </div>
    
    
    })}

  </div>
  </>
}