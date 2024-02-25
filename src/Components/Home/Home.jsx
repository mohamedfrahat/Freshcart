import React, { useContext } from 'react';
import styles from './Home.module.css';
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import MainSlider from '../MainSlider/MainSlider';
import CatigoriesSlider from '../CatigoriesSlider/CatigoriesSlider';
import { Helmet } from 'react-helmet';


export default function Home() {

  let url = 'https://route-ecommerce.onrender.com/api/v1/products'

  return <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Carts </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <MainSlider/>
  <CatigoriesSlider/>
    <FeatureProducts />

  </>
}
