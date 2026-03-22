import React from 'react'
import { useEffect } from 'react';
import { useState,useContext } from 'react';
import api from '../../api';
import { UserContext } from '../../context/User';
import { useParams, useNavigate } from 'react-router-dom';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { ShoppingCartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PlaceholderImage from '../../components/PlaceholderImage/PlaceholderImage';

const ProductDescription = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product , setProduct] = useState({});
    const [wishlist,setWishlist] = useState(false);
    const [cart,setCart] = useState(false);
    const {user} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);

    const fetchProduct = async ()=>{
        try {
            const response = await api.get(`/product/${id}`);
                setProduct(response.data.product);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchWishlistStatus = async ()=>{
        try {
            const wishlistStatus = await api.get(`/wishlist/${id}`);
            if(wishlistStatus.status===200) setWishlist(true);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchCartStatus = async ()=>{
        try {
            const cartStatus = await api.get(`/cart/${id}`);
            if(cartStatus.status === 200) setCart(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchProduct();
        fetchWishlistStatus();
        fetchCartStatus();
        setLoading(false);
    },[id]);

    const addWishlist = async ()=>{
        try {
            const addResponse = await api.post('wishlist/add',{productId : product._id});
            if(addResponse.status===201) setWishlist(prevWishlist => !prevWishlist);
        } catch (error) {
            console.log(`Error in adding to wishlist`);
        }
    }
    const removeWishlist = async ()=>{
        try {
            const removeResponse = await api.post('wishlist/remove',{productId : id});
            if(removeResponse.status===200) setWishlist(prevWishlist => !prevWishlist);
        } catch (error) {
            console.log(`Error in removing from wishlist : ${error}`);
        }
    }
    const changeWishlist = ()=>{
        if(user && !wishlist) addWishlist();
        else if(user) removeWishlist();
    }

    const removeCart = async ()=>{
        try {
            setCartLoading(true);
            const response = await api.post('/cart/remove' , {productId : id});
            if(response.status == 200) setCart(false);
        } catch (error) {
            console.log(`Error in removing from cart : ${error}`);
        } finally {
            setCartLoading(false);
        }
    }
    const addCart = async ()=>{
        try {
            setCartLoading(true);
            const response  = await api.post('/cart/add' , {productId : id , quantity : 1})
            if(response.status == 201) setCart(true);
        } catch (error) {
            console.log(`Error in adding to cart : ${error}`);
        } finally {
            setCartLoading(false);
        }
    }
    const changeCart = ()=>{
        if(user && cart) removeCart();
        else if(user) addCart();
    }

    return (
        <div className='min-h-screen bg-[var(--color-bg-primary)]'>
            {/* Back Button */}
            <div className='page-shell pt-6'>
                <button
                    onClick={() => navigate(-1)}
                    className='inline-flex items-center gap-2 text-[var(--color-primary-dark)] hover:text-[var(--color-primary-light)] transition-colors font-semibold px-4 py-2 rounded-full bg-white/80 shadow-sm'
                >
                    <ArrowLeftIcon className='w-5 h-5' />
                    Back
                </button>
            </div>

            {/* Product Content */}
            <div className='page-shell section-gap'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 rounded-2xl md:rounded-3xl surface-block p-4 md:p-6 lg:p-8'>
                    {/* Image Section */}
                    <div className='flex items-center justify-center'>
                        {loading ? (
                            <Skeleton height={500} width={400} containerClassName='w-full' />
                        ) : (
                            <div className='card w-full aspect-square flex items-center justify-center gradient-lavender p-4 rounded-2xl md:rounded-3xl'>
                                {!imageError && product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className='w-full h-full object-contain'
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <div className='flex items-center justify-center h-full'>
                                        <PlaceholderImage width={300} height={300} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className='flex flex-col justify-between gap-6'>
                        {/* Product Info */}
                        <div>
                            {/* Name */}
                            <div>
                                {loading ? (
                                    <Skeleton height={40} width={300} containerClassName='mb-4' />
                                ) : (
                                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-text-primary)] mb-4 leading-tight'>
                                        {product.name}
                                    </h1>
                                )}
                            </div>

                            {/* Price */}
                            <div>
                                {loading ? (
                                    <Skeleton height={50} width={150} containerClassName='mb-6' />
                                ) : (
                                    <div className='mb-6'>
                                        <p className='text-[var(--color-text-light)] text-sm mb-2'>Price</p>
                                        <div className='bg-[var(--color-primary-soft)] border border-[var(--color-primary-light)] rounded-2xl px-5 md:px-6 py-4 inline-block shadow-sm'>
                                            <p className='text-3xl md:text-4xl font-semibold text-[var(--color-primary-deep)]'>
                                                Rs. {product.price}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className='mb-8'>
                                {loading ? (
                                    <Skeleton height={150} containerClassName='mb-4' />
                                ) : (
                                    <div>
                                        <h3 className='text-lg font-semibold text-[var(--color-text-primary)] mb-3'>
                                            Description
                                        </h3>
                                        <p className='text-[var(--color-text-secondary)] leading-relaxed bg-[var(--color-bg-tertiary)] p-4 md:p-5 rounded-xl border border-[var(--color-primary-light)]/45'>
                                            {product.description || 'No description available'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col gap-3 md:gap-4'>
                            {/* Cart Button */}
                            <button
                                onClick={changeCart}
                                disabled={cartLoading || !user}
                                className={`w-full py-3.5 md:py-4 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 transition-all ${
                                    cart
                                        ? 'bg-red-100 text-red-700 border-2 border-red-300 hover:bg-red-200'
                                        : 'btn-primary'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <ShoppingCartIcon className='w-5 h-5' />
                                {!user ? 'Login to Add' : cart ? 'Remove from Cart' : 'Add to Cart'}
                            </button>

                            {/* Wishlist Button */}
                            <button
                                onClick={changeWishlist}
                                disabled={!user}
                                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border-2 ${
                                    wishlist
                                        ? 'bg-red-50 text-red-600 border-red-300 hover:bg-red-100'
                                        : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border-[var(--color-primary-light)] hover:border-[var(--color-primary-dark)]'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {wishlist ? (
                                    <>
                                        <HeartIconSolid className='w-5 h-5' />
                                        Added to Wishlist
                                    </>
                                ) : (
                                    <>
                                        <HeartIconOutline className='w-5 h-5' />
                                        Add to Wishlist
                                    </>
                                )}
                            </button>

                            {/* Login prompt */}
                            {!user && (
                                <p className='text-center text-sm text-[var(--color-text-light)]'>
                                    Please log in to add items to cart or wishlist
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription