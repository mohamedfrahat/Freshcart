import React, { useEffect } from 'react';
import styles from './Brands.module.css';
import { getBrands } from '../../Store/BransSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function Brands() {

 let {Brands,isLoading}=useSelector(({brand})=>brand)

let dispatch = useDispatch();
useEffect(()=>{

  dispatch(getBrands())
},

[])
  return <>
    <h2 className='text-center py-4'>Brands</h2>
 
    {isLoading ? <div className="loading d-flex justify-content-center align-items-center vh-100">
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
</div>:<>
<div className="row" >
 
  {Brands.map(brand=> <div key={brand._id} className="col-md-3">
      <div className="product rounded-1" >
        <img src={brand.image} className='w-100  rounded-1' alt={brand.name} />
        <p className='text-main fw-bold'>{brand.name}</p>
      </div>

  </div>)}
</div>

</>}





  </>
}
