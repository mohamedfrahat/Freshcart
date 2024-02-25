import axios from "axios";
import { createContext } from "react";

export  let CatigoryContext = createContext();

export default function CatigoryContextProvider (props){

async function getSpacificGarigory(GatigpryId){

   let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${GatigpryId}/subcategories`)
    // console.log(data);
    return data;
}

{   
   return <CatigoryContext.Provider  value={{getSpacificGarigory}}>
           {props.children }
    </CatigoryContext.Provider>

}}
