import React, { useContext, useEffect } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Categories() {
 function getCategories (){
  return axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
 }
 let {data,isLoading}= useQuery('Categories',getCategories,{
  cacheTime:3000
 } )





//  console.log(data?.data.data[0]._id);

 

  return <>
    <h2 className=' text-center py-3'>Categories</h2>
    {isLoading?<div className="loading d-flex justify-content-center align-items-center vh-100">
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
                </div> :<div className="row">{
      data.data.data.map(catigory=> 
     
      <div key={catigory._id} className="col-md-4  border-4 py-4 ">
         <Link to={`/CatigoryDetails/${catigory._id}`}>
      <img src={catigory.image} height={200} className='w-100' alt={catigory.name}/>
      <p className='text-main fw-bold'>{catigory.name}</p>
      </Link>
    </div>

    )
    }
     
    </div>}
  </>
}
