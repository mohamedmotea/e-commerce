
import React from 'react'

import Product from '../Product/Product'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'

import {Helmet} from "react-helmet";
export default function Home() {
  return <>

  <MainSlider/>
  <CategoriesSlider/>
  <Product/>

  <Helmet>
               
               <title>Home</title>
               
           </Helmet>
  </>
}