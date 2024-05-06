
import  {  useContext } from "react";

import { useQuery } from "react-query";
import { CartContext } from "../../Context/Cart";
import { toast } from "react-hot-toast";

import {Helmet} from "react-helmet";
import { Link } from "react-router-dom";




export default function Cart() {
  const { displayCart, removeCart, updateCount ,clearCart,setCount } = useContext(CartContext);

  const { data, isLoading, refetch } = useQuery("carts", displayCart);


    


  async function removeProductCart(id) {
    const response = await removeCart(id);
    if (response.data.status === "success") {
      refetch();
      toast.success("Product Deleted successfully");
     
    } else {
      toast.error("Error !");
    }
  }

  async function updateProductCart(id, count) {
     await updateCount(id, count);
    refetch();
    toast.success("Product Add 1 successfully");
  }


  async function clearProductCart(){
      await clearCart()
        refetch()
        setCount(0)   
  }
  


  return  <>
    
    <Helmet>
            
            <title>Carts</title>
        
        </Helmet>

          <section id="cart" className="p-5 bg-light">
            <div className="d-flex justify-content-between">
              <h2 className="fw-bold">Cart Shop</h2>
              <Link to='/checkout'>
              <button className="btn btn-primary fw-semibold py-2">Check out</button>
              </Link>
            </div>




  { isLoading ? <>
    <div className="w-100 d-flex justify-content-center align-items-center">
  <i className="fa-solid fa-spinner fs-1 text-main"></i>
  </div>
  </> : data?.data ? <>
  
  <div className="d-flex justify-content-between my-5 flex-wrap">
              <h5 className="fw-bold ">
                Total price:
                <span className="text-main"> {data?.data.data.totalCartPrice} </span>  
              </h5>
              <h5 className="fw-bold ">
                Total number of items:
               <span className="text-main">{data?.data.numOfCartItems } </span> 
        
              </h5>
            </div> 
            { data?.data.data.products?.map((cart, index) => (
    <div
      key={index}
      className="row g-3 align-items-center border-bottom"
    >
      <div className="col-md-2 p-0">
        <img className="w-100" src={cart.product.imageCover} alt="" />
      </div>
      <div className="col-md-10">
        <div className="d-flex justify-content-between align-items-center ps-4 my-5">
          <div>
            <h5 className="fw-bolder">
              {cart.product.title.split(" ").slice(0, 3).join(" ")}
            </h5>
            <h4 className="h6 fw-bold my-4">
              <span className="text-main">{cart.price}</span> EGP
            </h4>
            <button
              onClick={() => removeProductCart(cart.product.id)}
              className="btn p-0 fw-bolder"
            >
              <i className="fas fa-trash text-danger fs-5"></i> Remove
            </button>
          </div>
          <div >
            <button
              onClick={() =>
                updateProductCart(cart.product.id, cart.count + 1)
              }
              className="btn border fs-4"
            >
              +
            </button>
            <span className="mx-3 fw-bolder text-main">
              {cart.count}
            </span>
            <button
              onClick={() =>
                updateProductCart(cart.product.id, cart.count - 1)
              }
              className="btn border fs-4"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  )) }
  {( data?.data.numOfCartItems > 0) ?  <div className="text-center py-3 my-5">
                        <button onClick={()=> clearProductCart()} className="btn fw-bolder fs-4 border text-main">Clear Your Cart</button>
            </div> : ''}
  </> : <h2 className="my-4 text-black-50"> your cart is empty</h2> }

     


          </section>
        </>
   

}