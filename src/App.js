import { RouterProvider ,createBrowserRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import Cart from './Component/Cart/Cart';
import Product from './Component/Product/Product';
import Brands from './Component/Brands/Brands';
import Register from './Component/Register/Register';
import SignIn from './Component/SignIn/SignIn';

import Categories from './Component/Categories/Categories';
import Notfound from './Component/Notfound/Notfound';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import  { Toaster } from 'react-hot-toast';
// import {UserToken} from './Context/Token'
// import { useContext, useEffect } from 'react';
// import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import CartContextProvider from './Context/Cart';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';
import ResetPassword from './Component/ResetPassword/ResetPassword';
import WishList from './Component/WishList/WishList';
import WishProvider from './Context/WishList';
import CheckOut from './Component/CheckOut/CheckOut';
  
//* With ProtectedRoute
/*  {path:'',element:<Layout/>,children:[
        {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
        {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
        {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
        {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
        {path:'products',element:<ProtectedRoute><Product/></ProtectedRoute>},
        {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
        {path:'register',element:<Register/>},
        {path:'signIn',element:<SignIn/>},
        {path:'forgotpassword',element:<ForgotPassword/>},
        {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
        {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
        {path:'resetpassword',element:<ResetPassword/>},
        {path:'checkout',element:<CheckOut/>},
        {path:'*',element:<Notfound/>},
    ]}*/

const router = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
        {index:true,element:<Home/>},
        {path:'/home',element:<Home/>},
        {path:'/wishlist',element:<WishList/>},
        {path:'/cart',element:<Cart/>},
        {path:'/products',element:<Product/>},
        {path:'/brands',element:<Brands/>},
        {path:'/register',element:<Register/>},
        {path:'/signIn',element:<SignIn/>},
        {path:'/forgotpassword',element:<ForgotPassword/>},
        {path:'/categories',element:<Categories/>},
        {path:'/productdetails/:id',element:<ProductDetails/>},
        {path:'/resetpassword',element:<ResetPassword/>},
        {path:'/checkout',element:<CheckOut/>},
        {path:'*',element:<Notfound/>},
    ]}
])

function App() {





  return <>
    <WishProvider>
  <CartContextProvider>


  <RouterProvider router={router}></RouterProvider>


  <Toaster />
  </CartContextProvider>
  </WishProvider>


  </>
}

export default App;
