import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../../Context/WishlistContext';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function HearIcon({ id }) {
    let [Wishcolor, SetWishcolor] = useState([]);
    // let {  GetAllWishlist } = useContext(WishlistContext);
    let [loading, Setloading] = useState(false);

    let headers = {
        token: localStorage.getItem('usertoken')
    }
    // function GetWishlistItem() {

    //     return axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', {
    //         headers

    //     })
    // }
    // let { data, isLoading, isError, isFetching, isFetched } = useQuery('wishitem', GetWishlistItem, {


    // });


  async  function GetWishlistItem(){
        let {data} =  await axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', {
            headers

        })

        // console.log(response.data.data);
        // SetWishcolor(data.data)
        // Setloading(false);

    }

// console.log(data?.data.data);


    // async function GetWishlistItem() {


    //     let response  = await GetAllWishlist();

    //   SetWishcolor(response.data.data);



    // }
    useEffect(() => {
        GetWishlistItem();


    }, [Wishcolor])
  
   

    // if(isFetched)
    // {
    //     // SetWishcolor(...data.data.data);
     
    //     for (let index = 0; index < data?.data.data.length; index++) {
    //         if (data.data.data[index]._id ==id) {
    //             //   SetrightID(true)
    //         }
          
           

            
    //     }

    // }

    return (
        <>
           

           {loading  ? <i className="fa-solid fa-heart fs-3  " ></i> :Wishcolor.filter(color=>color._id ==id).length!==0?
    

    <i style={{color:'red'}} className="fa-solid fa-heart fs-3  " ></i>
   
    : <i  className="fa-solid fa-heart fs-3  " ></i>

    }
        </>
    )
}
