import { createContext, useState } from "react";


export let Countercontext = createContext()

export default function Countetcontextprovider(props) {

   let [count, setCount] = useState(0);



   return <Countercontext.Provider value={{setCount,count}}  >

      {props.children}


   </Countercontext.Provider>

}