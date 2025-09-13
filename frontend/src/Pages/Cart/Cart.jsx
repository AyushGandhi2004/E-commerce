import React, { useState,useEffect } from "react";
import api from "../../api";
import ProductCard from "../../components/ProductCard/ProductCard";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Cart = ()=>{
    const [cartItemsIds, setCartItemsIds] = useState([]);
    const [available,setAvailable] = useState(false);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchCartItems = async () =>{
            try {
                const response = await api.get('/cart');
                //console.log(response.data.cart.items);
                setCartItemsIds(response.data.cart.items);
                
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCartItems();
    },[]);


    if(!loading && cartItemsIds.length===0) return <div className=" flex justify-center mt-2 md:mt-4 text-md md:text-xl"> Your cart is empty</div>

    return(
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <h1 className="text-3xl text-gray-800 mt-1.5">{loading?<Skeleton height={30} width={400} containerClassName='flex-1'/> : "My Cart"}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full h-full">
                {
                    loading?
                    Array(8).fill().map((_,i)=>(
                    <Skeleton key={i} height={250}/>
                    )):
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