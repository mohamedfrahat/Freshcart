import { createSlice } from "@reduxjs/toolkit";
let initialState  ={count:0 ,usename:''}


let CounerSlice = createSlice({
    name:'CounterSlice',
    initialState,
    reducers:{
        increace: (state)=>{
            state.count+=1
        },
        decrease: (state)=>{
            state.count-=1
        }
    }
})
export  let CounterReducer= CounerSlice.reducer
export  let {increace,decrease}= CounerSlice.actions;