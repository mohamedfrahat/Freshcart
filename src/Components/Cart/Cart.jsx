import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/Cartcontext';
import { BallTriangle } from 'react-loader-spinner';
import { Usercontext } from '../../Context/usercontext';
import { Link } from 'react-router-dom';

export default function Cart() {

  let {GetCarditems ,DeletCartItem ,UpdateCartItem}= useContext(CartContext);

  const [loading,setLoading]= useState(true )
  const [btnloading,setBtnloading]= useState(false )
  const [cart,setCart]= useState(null)
  let {usertoken } = useContext(Usercontext);



async function GetItems(){
   let {data}=   await GetCarditems()
  //  console.log(data);
   setCart(data);
   setLoading(false)
  //  console.log(cart);
}
async function DeletItem(productId){
  setLoading(true);
  let {data}=   await DeletCartItem(productId)
  setCart(data);
  console.log(data);
  if (data.status=='success') {
    setLoading(false)
  }

}
async function UpdateItem(productId,count ){
  // setLoading(true); 
  setBtnloading(true)
 if(count< 1){
  let {data}=   await DeletCartItem(productId)
  setCart(data);
 }
 else{
  let {data}=   await UpdateCartItem(productId,count)
  setCart(data);
 }
 setBtnloading(false)
  
  setLoading(false)
}

useEffect(()=>{
 

  GetItems();

  
},[cart])

  return <> <div className="bg-main-light py-2 mt-5">
    <h2>Cart</h2>
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
</div>: cart?
 <>
  <p className='text-main p-1'> numOfCartItems : {cart.numOfCartItems}</p>
  <p>Price: {cart?.data.totalCartPrice} EGP</p>
 {cart?.data.products.map(product =>  <div className="row border-bottom align-items-center border-1 m-0 py-2" key={product.product.id}>
    <div className="col-md-1">
      <div className="img">
        <img  className='w-100' src={product.product.imageCover} alt={product.product.title} />
      </div>
    
    </div>
    <div className="col-md-10">
        <div className="item">
        <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
        <p className='text-main fw-bold'>price :{product.price}</p>
        <button onClick={()=>DeletItem(product.product.id)} className='btn '> <i className='fas fa-trash text-danger'></i> Remove</button>
        </div>
      </div>
      <div className="col-md-1">
          <div className="count d-flex align-items-center">
           {btnloading?<i className='fa-spinner fas fa-spin text-light bg-main' ></i>: <button onClick={()=>UpdateItem(product.product.id,product.count+1)} className='btn brdr p-1 bg-main text-light'>+</button> }
         <span className='mx-1'>{product.count}</span>
         {btnloading?<i className='fa-spinner fas fa-spin text-light bg-main' ></i>:  <button onClick={()=>UpdateItem(product.product.id,product.count-1)} className='btn brdr p-1 bg-main text-light'>-</button> }
        

          </div>
        </div>
  </div>)}

<Link to={`/PayDetails/${cart.data._id}`}><button className='btn bg-main text-light m-3 '> Pay Now </button></Link>
</>:<>
<h2>Cart Is Empty</h2>
</>


}
  </div>
  
   
   
   
  </>
}
