import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlice";
import { BrandsSlice } from "./BransSlice";

 
export  let store = configureStore({
    reducer:{
        counter :CounterReducer,
        brand: BrandsSlice
    }
})