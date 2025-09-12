import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../api';
import { useParams } from 'react-router-dom';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const ProductDescription = () => {
    const {id} = useParams();
    const [product , setProduct] = useState({});
    const [wishlist,setWishlist] = useState(false);
    const [cart,setCart] = useState(false);
    //removeWishlist not working and in useEffect i need to setWishlist acc to if product is present or not and for that i need to create a backend query if for checking if a product is in a user's wishlist or not
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
        if(!wishlist) addWishlist();
        else removeWishlist();
    }

    const removeCart = async ()=>{
        try {
            const response = await api.post('/cart/remove' , {productId : id});
            if(response.status == 200) setCart(false);
        } catch (error) {
            console.log(`Error in removing from cart : ${error}`);
        }
    }
    const addCart = async ()=>{
        try {
            const response  = await api.post('/cart/add' , {productId : id , quantity : 1})
            if(response.status == 201) setCart(true);
        } catch (error) {
            console.log(`Error in addin to cart : ${error}`);
        }
        
    }
    const changeCart = ()=>{
        if(cart) removeCart();
        else addCart();
    }

  return (
    <div className='flex flex-col items-center w-full h-screen'>
        
        <img src={product.imageUrl} alt="Product Image" />
        
        <div className='flex justify-between w-full px-2 mt-3 md:px-4'>
            <div className='text-lg md:text-xl flex flex-wrap '>{product.name}</div>
            <div className='bg-blue-400 p-2 rounded-xl text-bold'>Rs. {product.price}</div>
        </div>
        <div className='w-full my-2 flex justify-between'>
            <button className='h-8 w-8 md:h-10 md:w-10 pl-2 md:pl-4' onClick={changeWishlist}>{wishlist?<HeartIconSolid/>:<HeartIconOutline/>}</button>
            <button className='p-1 outline-1 rounded-full mr-2 md:mr-4' onClick={changeCart} >{cart? "Added" : "Add to Cart"}</button>
        </div>
        <div className='flex flex-wrap w-full m-2 p-2 md:m-4 md:p-4'>
            {product.description}
        </div>
    </div>
  )
}

export default ProductDescription