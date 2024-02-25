import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState ={Brands:[], isLoading:false,error :null }
export  let getBrands = createAsyncThunk('BrandSlice/getBrands',
async ()=>{
     let {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/brands').catch((error)=>error)
// console.log(data);
return data.data
    })
  let BransSlice =createSlice({
    name:'BrandSlice',
    initialState,
    extraReducers:(buldier)=> {
        buldier.addCase(getBrands.pending,(state ,action)=>{
            state.isLoading=true
        })
        buldier.addCase(getBrands.fulfilled,(state ,action)=>{
            state.isLoading=false
            state.Brands =action.payload
        })
    }

    
})
export let BrandsSlice = BransSlice.reducer