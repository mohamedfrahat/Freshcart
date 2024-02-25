import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../../Context/WishlistContext';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/Cartcontext';
import { Countercontext } from '../../Context/Context';

export default function WishList() {


  const [btnloading,setBtnloading]= useState(false )



  let [loading ,setloading]=useState(true)
  let [wishlist ,setWishlist]=useState(true)
 

  let headers = {
    token: localStorage.getItem('usertoken')
}

  async function GetAllWishlist() {
       
    let{data}=  await axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', {
        headers
      
  }
    )
    
  if(data.status=='success'){
    setWishlist(data.data)
   
    setloading(false)
  }

}
useEffect(()=>{
  GetAllWishlist()
},[wishlist])


let { DeletWishlistItem } = useContext(WishlistContext);
///////////////////////////////
async function deletitem (productId){
  setloading(true);
  let{data}= await DeletWishlistItem(productId)
  
  if(data.status=='success')
 { toast.success(data.message)
 
  


}
}
// console.log(data?.data.data);

// loading=isLoading;
/////////////////////////////////////////////////

let { addToCart } = useContext(CartContext);
async function PostToCart(ProudctId) {

  setBtnloading(true)
  let { data } = await addToCart(ProudctId);



  if (data.status == 'success') {
      toast.success(data.message);
  setBtnloading(false)

  }
}

  return (
    <>
    <div className="bg-main-light py-2 mt-5">
    <h2 className='fw-bold'>Wishlist</h2>
    {loading  ? <div className="loading d-flex justify-content-center align-items-center vh-100">
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
</div>: <>


 {wishlist.map(product =>  <div className="row border-bottom align-items-center border-1 m-0 py-2" key={product._id}>
    <div className="col-md-1">
      <div className="img">
        <img  className='w-100' src={product.imageCover} alt={product.title} />
      </div>
      
    
    </div>
    <div className="col-md-8">
        <div className="item">
        <h3 className='h5 fw-bold'>{product.title.split(' ').slice(0,3).join(' ')}</h3>
        <p className='text-main fw-bold'>price :{product.price}</p>
        <button onClick={()=>deletitem(product._id)} className='btn'> <i className='fas fa-trash text-danger'></i> Remove</button>
        </div>
      </div>
      <div className="col-md-3 text-end">
      {btnloading?<i  className='fas bg-main text-light fs-1 fa-spin fa-spinner me-5' ></i>:<button onClick={()=>PostToCart(product._id) } className='btn bg-main  text-light' > Add to Chart </button>}
      
      
    
    </div>
 
  </div>)}

</>}
  </div>
  
   
   
   
  </>

  
  )
}
