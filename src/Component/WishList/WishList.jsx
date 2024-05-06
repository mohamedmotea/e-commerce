
import  { useContext } from 'react'

import { useQuery } from 'react-query'
import { Wish } from '../../Context/WishList'
import { toast } from 'react-hot-toast'
import { CartContext } from '../../Context/Cart'
import {Helmet} from "react-helmet";
export default function WishList() {
    

    const {displayWishList,removeWishProduct} = useContext(Wish)
    async function addProductToCart(id){

        const response = await addToCart(id)
        if(response.data.status === 'success'){
            toast.success(response.data.message)
            setCount(response.data.numOfCartItems)
        }else{
            toast.error(response.data.message)
        }
     }


    const {addToCart,setCount} = useContext(CartContext)

    const {data,isLoading,refetch} = useQuery('WishList',displayWishList)
async function removeItem(id){
   await removeWishProduct(id);
    refetch()
}

  return <>
  <Helmet>
            
            <title>WishList</title>
        
        </Helmet>

  <div className='p-5 bg-light'>
  <h2>WishList</h2>

{isLoading ? <div className="w-100 d-flex justify-content-center align-items-center">
  <i className="fa-solid fa-spinner fs-1 text-main"></i>
  </div> :data?.data.data.map((product)=>{return <div key={product.id} className="row border-bottom my-4">
    <div className="col-md-3">
        <img src={product.imageCover} alt="" className='w-100'/>
    </div>
    <div className="col-md-9 d-flex justify-content-between align-items-center py-5">
        <div className=''>
    <h1 className='h4'>{product.title.split(' ').slice(0,2).join(' ')}</h1>
    <p className='fw-bold text-main my-3'>{product.price} EGP</p>
    <button onClick={()=> removeItem(product.id)} className='btn btn-danger'> <i className='fas fa-trash'></i>  remove</button>
        </div>

    <div>
        <button onClick={()=> addProductToCart(product.id)} className='btn bg-main text-light'>add To Cart</button>
    </div>

    </div>
  </div>
})}
  </div>
  </>
}