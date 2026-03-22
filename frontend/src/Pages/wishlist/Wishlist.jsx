import React, { useEffect, useState } from 'react'
import api from '../../api';
import ProductCard from '../../components/ProductCard/ProductCard';
import Skeleton from 'react-loading-skeleton';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/User';
import 'react-loading-skeleton/dist/skeleton.css'

const Wishlist = () => {
    const { user } = useContext(UserContext);
    const [items , setItems]=useState([]);
    const [loading , setLoading]=useState(true);
    const navigate = useNavigate();

    const fetchItems = async ()=>{
        try {
            const response = await api.get('/wishlist')
            if(!response.data || response.length===0){
                setItems([])
            }
            else{
                setItems(response.data.wishlist.products)
            }
        } catch (error) {
            console.log(error,"Error in loading wishlist items");
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(!user){
            setLoading(false);
            return;
        }
        fetchItems();
    },[user])

    if(!user){
        return (
            <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center px-4">
                <div className="text-center max-w-lg card p-8 md:p-10">
                    <HeartIcon className="w-16 h-16 mx-auto text-[var(--color-primary-dark)] mb-4 opacity-70" />
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                        Login Required
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                        Please log in to see items in your wishlist.
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

    if(!loading &&  items.length==0) {
        return (
            <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center px-4">
                <div className="text-center">
                    <HeartIcon className="w-20 h-20 mx-auto text-[var(--color-primary-dark)] mb-4 opacity-50" />
                    <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                        Your Wishlist is Empty
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                        Add your favorite items to your wishlist
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

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)]">
            <div className="page-shell section-gap">
                {/* Page Header */}
                <div className="mb-8 md:mb-12 rounded-2xl md:rounded-3xl border border-[var(--color-primary-light)]/55 bg-white/70 px-5 md:px-7 py-5 md:py-6">
                    {loading ? (
                        <Skeleton height={50} width={300} containerClassName='flex-1'/>
                    ) : (
                        <div className="flex items-center gap-3 mb-2">
                            <HeartIcon className="w-8 h-8 text-[var(--color-primary-dark)]" />
                            <h1 className="text-4xl md:text-5xl font-bold heading-gradient">
                                My Wishlist
                            </h1>
                        </div>
                    )}
                    <p className="text-[var(--color-text-secondary)] mt-2">
                        {items.length} items in your wishlist
                    </p>
                </div>

                {/* Products Grid */}
                <div className='product-grid'>
                    {
                        loading?
                        Array(8).fill().map((_,i)=>(
                            <Skeleton key={i} height={250}/>
                        )):
                        items.map((item)=>{
                            return (
                                <ProductCard key={item._id} product={item}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Wishlist