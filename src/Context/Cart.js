import axios from "axios";
import { createContext, useState } from "react";


export const CartContext = createContext();

export default function CartContextProvider(props){

    const headers = localStorage.getItem('userToken')
  
    
    function addToCart(productId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId
        }, {headers:{
            token:headers
        }} ).then((response)=> response).catch((error)=> error)
    }
    
    function displayCart(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{
                token:localStorage.getItem('userToken')
            }
        }).then((response)=> response).catch((error)=> error)
    }
    function removeCart(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:{
            token:headers
        }}).then((response)=>response).catch((error)=>error)
    }

    function updateCount(productId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count:count
        },{
            headers:{token:headers}
        }).then((response)=>response).catch((error)=>error)
    }

    function clearCart(){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{
                token:headers
            }
        }).then((response)=>response).catch((error)=>error)
    }
    function cashOrder(orderID,shipp){
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${orderID}`,{
        shippingAddress:shipp
      },{
        headers:{
          token:headers
        }
      }).then((response)=>response).catch((error)=>error)
    }
    function checkoutsession(orderID,shipp){
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${orderID}?url=http://localhost:3000`,{
        shippingAddress:shipp
      },{
        headers:{
          token:headers
        }
      }).then((response)=>response).catch((error)=>error)
    }
const [count,setCount]= useState(0)

    return <CartContext.Provider value={{addToCart,displayCart,removeCart,updateCount,clearCart,count,setCount,cashOrder,checkoutsession}}>
        {props.children}
    </CartContext.Provider>

}