

import Slider from "react-slick";
import Slide1 from '../../Assets/Images/slide1.jpg'
import Slide2 from '../../Assets/Images/slide2.jpg'
import Slide3 from '../../Assets/Images/slide3.jpg'
import MainSlider1 from '../../Assets/Images/mainSlide1.jpg'
import MainSlider2 from '../../Assets/Images/mainSlide2.jpg'




export default function MainSlider() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000
      };


  return <>
  

  <div className="row justify-content-center gx-0 my-5">
    <div className="col-md-4">
    <Slider {...settings}>
        <img height={500} src={Slide1} alt="" />
        <img height={500} src={Slide2} alt="" />
        <img height={500} src={Slide3} alt="" />
        </Slider>
    </div>
    <div className="col-md-4">
        <img height={250} src={MainSlider1} alt="" />
        <img height={250} src={MainSlider2} alt="" />
    </div>
  </div>
  </>
}