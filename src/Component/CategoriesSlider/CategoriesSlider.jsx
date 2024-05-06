
import React from 'react'

import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from 'react-slick'
export default function CategoriesSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:7,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:1500,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            }
          ]
      };


    function getCategoriesImg(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    const {data} = useQuery('categoriesSlider',getCategoriesImg)

  return <>

  <div className="row">
  <Slider {...settings}>

    {data?.data.data.map((category,index)=> <div key={index} className='col-md-4'>
        <img src={category.image} className='w-100' height={300} alt="" />
    </div>
    )}

    </Slider>
  </div>

  </>
}