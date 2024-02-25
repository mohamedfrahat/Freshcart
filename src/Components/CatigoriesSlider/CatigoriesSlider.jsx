import axios from 'axios';
import React from 'react'
import { useQueries, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

export default function CatigoriesSlider() {
    var settings = {
        dots: false,

        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows:false
    };
   
    function getgatigory(){
        return axios.get('https://route-ecommerce.onrender.com/api/v1/categories');
    }
  let {data}=useQuery('gatigory',getgatigory )
    // console.log(data?.data.data);
  return (
    
    <>
    <div className="row">
 
  <Slider {...settings}>
        {data?.data.data.map(catigory=> 
        <div key={catigory._id} className="col-md-6">
           <Link to={`/CatigoryDetails/${catigory._id}`} >
            <img className='w-100' height={200} src={catigory.image} alt={catigory.name} />
            <p>{catigory.name}</p>
        </Link>
        </div>
       )}
</Slider>
    </div>
    </>
  )
}
