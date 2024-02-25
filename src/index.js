import React from 'react';
import ReactDOM from 'react-dom/client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css'
import Usercontextprovider from './Context/usercontext.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import{ReactQueryDevtools} from 'react-query/devtools'
import CartContextProvider from './Context/Cartcontext.js';
import CatigoryContextProvider from './Context/Catigory.js';
import WishlistProvider from './Context/WishlistContext.js';

let queryClint = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WishlistProvider>
  <CatigoryContextProvider>
  <CartContextProvider>
    <Usercontextprovider>
          <QueryClientProvider client={queryClint}>
        <App />
 
        </QueryClientProvider>
    </Usercontextprovider>
    </CartContextProvider>
    </CatigoryContextProvider>
    </WishlistProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
