import React, { useState,useEffect } from "react";
import api from "../../api";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Cart = ()=>{
    const [cartItemsIds, setCartItemsIds] = useState([]);
    const [available,setAvailable] = useState(false);

    useEffect(()=>{
        const fetchCartItems = async () =>{
            try {
                const response = await api.get('/cart');
                //console.log(response.data.cart.items);
                setCartItemsIds(response.data.cart.items);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchCartItems();
    },[]);


    if(cartItemsIds.length===0) return <div> Your cart is empty</div>

    return(
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <h1 className="text-3xl text-gray-800">My Cart</h1>
            <div className="grid grid-cols-4 gap-4 p-4 w-full h-full">
                {
                    cartItemsIds.map((item)=>{
            
                        
                        return(
                            <ProductCard key={item.productId._id} product = {item.productId}/>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Cart;