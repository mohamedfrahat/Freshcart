import React, { Suspense, useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
// import Products from './Components/Products/Products'
// import Categories from './Components/Categories/Categories'
// import Brands from './Components/Brands/Brands'
// import CatigoryDetails from './Components/CatigoryDetails/CatigoryDetails'
import ProudectDetails from './Components/FeatureProducts/ProudectDetails/ProudectDetails'
import Register from './Components/Register/Register'
import Countetcontextprovider, { Countercontext } from './Context/Context'
import  { Usercontext } from './Context/usercontext'
import ProduectedRoute from './Components/ProduectedRoute/ProduectedRoute'

import Cart from './Components/Cart/Cart'
import toast, { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './Store/Store'

import WishList from './Components/WishList/WishList'
import Test from './Components/Test/Test'
import PayDetails from './Components/PayDetails/PayDetails'
import Allorders from './Components/allorders/Allorders'

const Brands = React.lazy(() => import('./Components/Brands/Brands.jsx'));
const Categories = React.lazy(() => import('./Components/Categories/Categories.jsx'));
const Products = React.lazy(() => import('./Components/Products/Products.jsx'));
const CatigoryDetails = React.lazy(() => import('./Components/CatigoryDetails/CatigoryDetails.jsx'));

let router = createBrowserRouter([{
  path: '', element: <Layout />, children: [
    { index: true, element: <ProduectedRoute><Home /></ProduectedRoute> },
    { path: '/Login', element: <Login /> },
    { path: '/Products', element: <Suspense><ProduectedRoute><Products /></ProduectedRoute></Suspense> },
    { path: '/Categories', element: <Suspense><ProduectedRoute><Categories /></ProduectedRoute></Suspense> },
    { path: '/ProudectDetails/:id', element: <ProduectedRoute><ProudectDetails /></ProduectedRoute> },
    { path: '/allorders/', element: <ProduectedRoute><Allorders /></ProduectedRoute> },
    { path: '/CatigoryDetails/:id', element:<Suspense> <ProduectedRoute><CatigoryDetails /></ProduectedRoute></Suspense> },
    { path: '/PayDetails/:cartId', element: <ProduectedRoute><PayDetails /></ProduectedRoute> },
    { path: '/Brands', element: <Suspense><ProduectedRoute> <Brands /></ProduectedRoute></Suspense> },
    { path: '/Wishlist', element: <ProduectedRoute> <WishList /></ProduectedRoute> },
    { path: '/cart', element: <ProduectedRoute> <Cart/></ProduectedRoute> },
    { path: '*', element: <ProduectedRoute> <Test/></ProduectedRoute> },
    { path: '/Register', element: <Register /> },


  ]

}])


export default function App() {

  
    
  let {usertoken, setusertoken } = useContext(Usercontext);

  useEffect(()=>{
    if (localStorage.getItem('usertoken')) {
      setusertoken(localStorage.getItem('usertoken'));
   
    }
  },[usertoken])
  return (
    <>




      <Countetcontextprovider>

      <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster/>
      </Provider>
      </Countetcontextprovider>

    </>
  )
}
