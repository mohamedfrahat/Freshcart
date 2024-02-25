import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'
import Slider from "react-slick";
import { useContext } from 'react';
import { CartContext } from '../../../Context/Cartcontext';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
export default function ProudectDetails() {
    var settings = {
        dots: false,
        
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1000
    };
    let { id } = useParams()
    let [details, setDetails] = useState({});
    let [loading, setLoading] = useState(true);

    // console.log(id);
    async function getproductdetails(id) {
        let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
        setDetails(data.data);
        setLoading(false);
    }
    let {addToCart}=useContext(CartContext)

    async function AddItem(id){
     
  
    await   addToCart(id)
    toast.success('Product added successfully to your cart');




    }
    useEffect(() => {
        getproductdetails(id);
    }, [])
    return (
        <>
             
            <h2 className='text-center'>Proudect Details</h2>
            {loading ? <div className="loading d-flex justify-content-center align-items-center vh-100">
                <BallTriangle
                    height={200}
                    width={200}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div> : <>
          
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <Slider {...settings}>
                                
                                    {details.images.map(img => <img key={details.id} src={img} />)}
                               
                            </Slider>
                          
                        </div>
                        {/*              */}
                        <div className="col-md-8">
                            <div className="details">
                                <h3 className='h6'>{details.title}</h3>
                                <p className='py-3'>{details.description}</p>
                                <span className='font-sm text-main'>{details.category.name}</span>
                                <div className="d-flex py-3 justify-content-between align-items-center">

                                    <span className='font-sm '>{details.price}EGP</span>
                                    <span className='font-sm'>
                                        <i className='fa fa-star rating-color'>{details.ratingsAverage}</i>
                                    </span>
                                </div>
                            </div>
                            <button  onClick={()=> AddItem(details.id)} className='btn bg-main text-light w-100 mb-2'> +Add to chart </button>
                            <Helmet>
                <meta charSet="utf-8" />
                <title>{details.title} </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}
