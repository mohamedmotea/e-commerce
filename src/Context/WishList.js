
import axios from "axios";
import { createContext } from "react";


export const Wish = createContext()

export default function WishProvider (props){

    function addWishList(productId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
            productId
        },{
            headers:{
                token:localStorage.getItem('userToken')
            }
        }).then((response)=>response).catch((error)=>error)
    }

    function displayWishList(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
            headers:{
                token:localStorage.getItem('userToken')
            }
        }).then((response)=>response).catch((error)=>error)
    }

    function removeWishProduct(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers:{
                token:localStorage.getItem('userToken')
            }
        }).then((response)=>response).catch((error)=>error)
    }



    return <Wish.Provider value={{addWishList,displayWishList,removeWishProduct}}>
        {props.children}
    </Wish.Provider>

}