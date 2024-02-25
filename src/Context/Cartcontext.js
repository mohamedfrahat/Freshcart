import axios from "axios";
import { createContext, useState } from "react"

export let CartContext = createContext();

export default function CartContextProvider(props) {

let headers ={
    token:localStorage.getItem('usertoken')
}

        function addToCart (productId){
        //   console.log( headers.token);
            return axios.post('https://route-ecommerce.onrender.com/api/v1/cart',{
                productId
            },{
                headers
                
            })
            .then(response => response)
            .catch(error=>error)
            
        }
        function checkoutsession (cartId ,shippingAddress){
            //   console.log( headers.token);
                return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
                    shippingAddress
                },{
                    headers
                    
                })
                .then(response => response)
                .catch(error=>error)
                
            }
        function GetCarditems (){
            return axios.get('https://route-ecommerce.onrender.com/api/v1/cart',{
                headers
            })
            .then(response => response)
            .catch(error=>error)
        }

        async function DeletCartItem (productId){
            return await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{
                headers
            })
            .catch(error=>error)
        }
        async function UpdateCartItem (productId,count ){
            return await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{
                count
            },{
                headers
            })
            .catch(error=>error)
        }


    return <CartContext.Provider value={{ addToCart ,GetCarditems ,DeletCartItem,UpdateCartItem ,checkoutsession}} >
        {props.children}

    </CartContext.Provider>

}
