import React, { useContext, useEffect, useState } from 'react'
import { CatigoryContext } from '../../Context/Catigory';
import { useParams } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function CatigoryDetails() {
   let [catigory ,setCatigory ] =  useState(null);
   let [loading  ,setLoading  ] =  useState(true);
    let {getSpacificGarigory} = useContext(CatigoryContext);
 async   function GetCatiogy (catigoryId){
    let {data}=  await    getSpacificGarigory(catigoryId);
   
    setCatigory(data);
    // console.log(data);
    setLoading(false);
   
    }
    let {id} =  useParams();
useEffect(()=>{
    GetCatiogy(id);
},[])


  return (
    <>
      
    
    {loading ?
     <div className="loading d-flex justify-content-center align-items-center vh-100">
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
        <div className="row align-items-center">
      {catigory.map(catigory=>  <div key={catigory._id}  className="col-md-4 py-5">
            <p className='text-center fw-bold py-5'>{catigory.name}</p>
            {/* <p className='text-main'>{catigory.slug}</p> */}
        </div>)}
        </div>
      

</>}
    </>
  )
}
