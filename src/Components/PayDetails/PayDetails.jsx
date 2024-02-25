import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/Cartcontext'
import { useParams } from 'react-router-dom';

export default function PayDetails() {

    let{cartId}=useParams()

    let {loading,setloading}= useState(false)
    
    let {checkoutsession}= useContext(CartContext);
  async  function CheckOut(values){
   
        let {data}= await checkoutsession(cartId,values);
        if (data.status=='success') {
           window.location.href=data.session.url;
            
        }

    }

    let formik = useFormik({
        initialValues:{

            details:'',
            phone:'',
            city:'',
            
        },
        onSubmit:CheckOut
    })
  return (
    <>
    <h2 className='pt-3'>Pay details  </h2>
      <div className="w-75 mx-auto mt-4 ">
        <form onSubmit={formik.handleSubmit} >
            <label  className='mb-1' htmlFor="details">details :</label>
            <input onChange={formik.handleChange} type="text" id='details' name='details'  className='form-control my-3'/>

            <label  className='mb-1' htmlFor="phone">phone :</label>
            <input onChange={formik.handleChange} type="tel" id='phone' name='phone'  className='form-control my-3'/>

            <label  className='mb-1' htmlFor="city">city :</label>
            <input onChange={formik.handleChange} type="text" id='city' name='city'  className='form-control my-3'/>
{loading?<i className='bg-main fas fa-spin fa-spinner'></i>: <button  className='btn bg-main text-light' type='submit'> Pay Online</button>}
       
        </form>
      </div>
      
    </>
  )
}
