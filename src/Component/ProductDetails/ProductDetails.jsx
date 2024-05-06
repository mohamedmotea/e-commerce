
import { useQuery } from 'react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import {Helmet} from "react-helmet";
export default function ProductDetails() {

    const settings = {
        dots: false,
       
        infinite: true,
        autoplay:true,
        speed: 500,
        autoplaySpeed:1500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    const param = useParams()

    
    function getProductDetails(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    
const {data,isLoading} = useQuery('productDetails',()=>getProductDetails(param.id))


  return <>
       
  <h2>ProductDetails</h2>

    {isLoading ? <>
    <div className="w-100 d-flex justify-content-center align-items-center">
  <i className="fa-solid fa-spinner fs-1 text-main"></i>
  </div>  </>:<>
    <div className="row m-0 justify-content-center align-items-center">
        <div className="col-md-4">
            <Slider {...settings}>
            {data?.data.data.images.map((img,index)=> <img key={index} src={img} className='w-100' alt={data?.data.data.title  }/>)}
       
        </Slider>
        </div>

        <div className="col-md-7">
        <Helmet>
                <title>{data?.data.data.title.split(' ').slice(0,2).join(' ')}</title>

            </Helmet>
            <h3>{data?.data.data.title}</h3>
            <p className='text-black-50 mt-3 mb-5'>{data?.data.data.description}</p>

            <span>{data?.data.data.category.name}</span>

            <div className="price-rating d-flex justify-content-between">
                <span className='fw-bold'>{data?.data.data.price} EGP</span>
                <span><i className="fa-solid fa-star rating-color"></i>{data?.data.data.ratingsAverage} </span>
            </div>

            <button className='btn w-100 bg-main text-light m-3'>+ Add To Cart</button>
        </div>
    </div>
    
    </>}
 
  </>
}
