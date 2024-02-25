import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Products from '../Products/Products';
import { BallTriangle, Circles, Discuss, FidgetSpinner, InfinitySpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';
import { toHaveStyle } from '@testing-library/jest-dom/matchers';
import { render } from '@testing-library/react';
import { Usercontext } from '../../Context/usercontext';
import HearIcon from '../HearIcon/HearIcon';
import { Countercontext } from '../../Context/Context';
import { Helmet } from 'react-helmet';



export default function FeatureProducts() {

    let [wishcolor, Setwishcolor] = useState([]);
    let [loadingscreen, Setloadingscreen] = useState(false);


    let { addToCart } = useContext(CartContext);
    let { addToWishlist ,DeletWishlistItem} = useContext(WishlistContext);
  
    function getproducts() {

        return axios.get('https://route-ecommerce.onrender.com/api/v1/products');
    }
    let { data, isLoading, isError, isFetching, isFetched } = useQuery('featuredproduct', getproducts, {


    });
    async function PostToCart(ProudctId) {

        let { data } = await addToCart(ProudctId);



        if (data.status == 'success') {
            toast.success(data.message);
        }
    }

///////////////////////////////
let headers = {
    token: localStorage.getItem('usertoken')
}
async  function GetWishlistItem(){
    let {data} =  await axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', {
        headers

    })

   
    // console.log(response.data.data);
    Setwishcolor(data.data)

   
    // Setloading(false);

}
 
useEffect(() => {
    GetWishlistItem();


}, [])
 /////////////////////
    async function deletitem(productId) {
   
        Setloadingscreen(true)
        let { data } = await DeletWishlistItem(productId)

        if (data.status == 'success') {
            toast.success(data.message)
            GetWishlistItem()
            Setloadingscreen(false)
        }
    }
/////////////////////////////////////
    async function PostToWishList(ProudctId) {

       
        Setloadingscreen(true)
     
            let { data } = await addToWishlist(ProudctId);
            if(data.status=='success')
           { toast.success(data.message)
            GetWishlistItem()
            Setloadingscreen(false)

          }
        

   
       

    
       
    }




    return (
        <>
            <h2 className='text-center'>FeatureProducts</h2>

            <div className="container  ">

                {isLoading ? <div className=" d-flex justify-content-center align-items-center vh-100">
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
                </div> : <div className="row gy-4 py-4">


                    {data?.data.data.map((product, index) =>

                        <div key={product.id} className="col-lg-3  ">

                            <div className="product rounded-1 p-2">
                                <Link to={`/ProudectDetails/${product.id}`}>
                                    <img src={product.imageCover} className='w-100 rounded-1 ' alt={product.title} />
                                    <span className='font-sm text-main'>{product.category.name}</span>

                                    <h3 className='h6'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                                    <div className="d-flex py-3 justify-content-between align-items-center">
                                        <span className='font-sm '>{product.price}EGP</span>
                                        <span className='font-sm'>

                                            <i className='fa fa-star rating-color'>{product.ratingsAverage}</i>
                                        </span>

                                    </div>

                                </Link>

                                <div  className='text-end '>
                               
                                   {wishcolor.filter(color=>color._id ==product.id).length!==0?
    

    <i style={{color:'red'}} onClick={() => deletitem(product.id)} className="fa-solid fa-heart fs-3  "  ></i>
   
    : <i  className="fa-solid fa-heart fs-3  " onClick={() => PostToWishList(product.id)}  ></i>
    }

                                    {/* style={{ color: color[index] }} */}
                                    {/* {console.log(color)} */}
                                </div>
                                <button onClick={() => PostToCart(product.id)} className='btn bg-main text-light cart-btn '> Add to chart </button>

                            </div>


                        </div>

                    )}





                </div>}



            </div>

         {loadingscreen? <div className="loading">
          <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
          </div>:''}

        </>
    )
}
//4fa94d
