import React, { useContext, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { Countercontext } from '../../Context/Context';
import { Usercontext } from '../../Context/usercontext';
import { CartContext } from '../../Context/Cartcontext';
import { useSelector } from 'react-redux';





export default function Navbar() {
  
  let { count ,setCount } = useContext(Countercontext);
  function LoutOut() {


    
    localStorage.clear();
  
    setusertoken(null)
    setCount(0);
  
    
  
  }

  let {GetCarditems }= useContext(CartContext);
  
  const [cart,setCart]= useState(null)
  async function GetItems(){
    let {data}=   await GetCarditems()
    setCart(data);

   
 }
 let { usertoken, setusertoken } = useContext(Usercontext);
 useEffect(()=>{
  GetItems();
 },[cart])
  


 
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary  ">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {usertoken ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home </NavLink>
            </li>
        
            <li className="nav-item">
              <NavLink className="nav-link" to="/Products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Brands">Brands</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Wishlist">Wish list</NavLink>
            </li>
            <li className="nav-item ms-5 ">
              <Link className="nav-link " to="/cart"> <i className="fa-solid fa-cart-shopping  fs-4  position-relative  ">
              <span className='text-light   bg-main position-absolute  rounded-circle'> {cart?.numOfCartItems}</span>  </i> </Link>
            </li>

          </ul> : ''}
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
         
            <li className="nav-item d-flex align-items-center">
         
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>

            {!usertoken ?
              <><li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li><li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>

              : <>

                <li className="nav-item">
                  <Link onClick={LoutOut} to="/login" className="nav-link" >Logout</Link>
                </li>
              </>}

          </ul>

        </div>
      </div>
    </nav>
  </>
}
