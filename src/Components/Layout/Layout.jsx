import React, { useContext } from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { Usercontext } from '../../Context/usercontext';
import { Offline, Online } from 'react-detect-offline';
export default function Layout() {

  // let {setusertoken } = useContext(Usercontext);

  // if (localStorage.getItem('usertoken')) {
  //   setusertoken(localStorage.getItem('usertoken'));
   
  // }
  return <>
  
   <Navbar />
   <div className="container">
   <Offline > <h2 className='loading'>you are ofline </h2> </Offline>

<Outlet></Outlet>
   </div>
  </>
}
