import React, { useState,useEffect } from "react";
import api from "../../api";
import ProductCard from "../../components/ProductCard/ProductCard";
import Skeleton from 'react-loading-skeleton';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/User";
import 'react-loading-skeleton/dist/skeleton.css'

const Cart = ()=>{
    const { user } = useContext(UserContext);
    const [cartItemsIds, setCartItemsIds] = useState([]);
    const [available,setAvailable] = useState(false);
    const [loading,setLoading]=useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            setLoading(false);
            return;
        }
        const fetchCartItems = async () =>{
            try {
                const response = await api.get('/cart');
                setCartItemsIds(response.data.cart.items);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCartItems();
    },[user]);

    if(!user){
        return (
            <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center px-4">
                <div className="text-center max-w-lg card p-8 md:p-10">
                    <ShoppingCartIcon className="w-16 h-16 mx-auto text-[var(--color-primary-light)] mb-4 opacity-70" />
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                        Login Required
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                        Please log in to see items in your cart.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="btn-primary"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if(!loading && cartItemsIds.length===0) {
        return (
            <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center px-4">
                <div className="text-center">
                    <ShoppingCartIcon className="w-20 h-20 mx-auto text-[var(--color-primary-light)] mb-4 opacity-50" />
                    <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                        Your Cart is Empty
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                        Start adding some amazing products!
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-primary"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-[var(--color-bg-primary)]">
            <div className="page-shell section-gap">
                {/* Page Header */}
                <div className="mb-7 md:mb-10 rounded-2xl md:rounded-3xl surface-block px-5 md:px-7 py-5 md:py-6">
                    {loading ? (
                        <Skeleton height={50} width={300} containerClassName='flex-1'/>
                    ) : (
                        <div className="flex items-center gap-3 mb-2">
                            <ShoppingCartIcon className="w-8 h-8 text-[var(--color-primary-dark)]" />
                            <h1 className="text-4xl md:text-5xl font-bold heading-gradient">
                                Shopping Cart
                            </h1>
                        </div>
                    )}
                    <p className="text-[var(--color-text-secondary)] mt-2">
                        {cartItemsIds.length} items in your cart
                    </p>
                </div>

                {/* Products Grid */}
                <div className="product-grid">
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

                {/* Footer Info */}
                {!loading && cartItemsIds.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-[var(--color-primary-light)]/30 text-center">
                        <p className="text-[var(--color-text-secondary)] mb-6">
                            Proceed to checkout to complete your purchase
                        </p>
                        <button className="btn-primary">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Cart;