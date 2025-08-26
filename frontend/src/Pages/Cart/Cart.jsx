import React, { useState,useEffect } from "react";
import api from "../../api";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Cart = ()=>{
    const [cartItems, setCartItems] = useState([]);

    useEffect(()=>{
        const fetchCartItems = async () =>{
            try {
                const response = await api.get('/cart');
                console.log(response.data);
                setCartItems(response.data.cart.items);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCartItems();
    },[]);

    return(
        <div>
            <h1>My Cart</h1>
            <div className="grid grid-cols-3 gap-4 p-4 w-full h-full">
                {
                    cartItems.length === 0 ? <p>Your Cart Is Empty</p>:
                    cartItems.map((item)=>{
                        return(
                            <ProductCard key={item._id} product = {item}/>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Cart;