import React from 'react'
import silde1 from '../../Assets/images/slider-image-1.jpeg'
import silde2 from '../../Assets/images/slider-image-2.jpeg'
import silde3 from '../../Assets/images/slider-image-3.jpeg'
import silde4 from '../../Assets/images/blog-img-1.jpeg'
import silde5 from '../../Assets/images/blog-img-2.jpeg'
import Slider from 'react-slick';
export default function MainSlider() {
    var settings = {
        dots: false,

        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows:false
    };
    return (
        <>
            <div className="row my-3 gx-0 ">
                <div className="col-md-9">
                <Slider {...settings}>
              
                    <img className='w-100' height={400} src={silde1} alt="Slide1" />
                    <img className='w-100' height={400} src={silde2} alt="Slide1" />
                    <img className='w-100'  height={400}src={silde3} alt="Slide1" />
                

            </Slider>
                </div>
                <div className="col-md-3">
                    <img src={silde4} className='w-100'  height={200} alt="" />
                    <img src={silde5} className='w-100'  height={200}  alt="" />
                </div>
            </div>
        </>
    )
}
