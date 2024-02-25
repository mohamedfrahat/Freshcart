import axios from "axios";
import { createContext } from "react";

export let WishlistContext = createContext()

export default function WishlistProvider(props) {

    let headers = {
        token: localStorage.getItem('usertoken')
    }
    async function addToWishlist(productId) {
        //   console.log( headers.token);
        return await axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist', {
            productId
        }, {
            headers

        })
            .catch(error => error)

    }
  
    async function GetAllWishlist() {
       
        return await axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', {
            headers
    
        })
            .catch(error => error)
    
    }
    async function DeletWishlistItem(productId) {
        
        return await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`, {
            headers
        })
            .catch(error => error)

    }

    return <WishlistContext.Provider value={{ addToWishlist ,GetAllWishlist ,DeletWishlistItem }}>

        {props.children}

    </WishlistContext.Provider>

}