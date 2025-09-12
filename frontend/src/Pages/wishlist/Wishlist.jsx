import React, { useEffect, useState } from 'react'
import api from '../../api';
import ProductCard from '../../components/ProductCard/ProductCard';

const Wishlist = () => {
    const [items , setItems]=useState([]);
    const [loading , setLoading]=useState(true);

    const fetchItems = async ()=>{
        try {
            const response = await api.get('/wishlist')
            if(!response.data || response.length===0){
                setItems([])
            }
            else{
                setItems(response.data.wishlist.products)
                console.log(items)
            }
        } catch (error) {
            console.log(error,"Error in loading wiishlist items");
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchItems();
    },[])

    if(items.length==0) return <div className=" flex justify-center mt-2 md:mt-4 text-md md:text-xl"> Your Wishlist is empty</div>

  return (
    <div className='flex flex-col justify-center w-full h-screen items-center'>
        <div className='text-2xl m-4'>Wishlist</div>
        <div className='flex grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full h-full'>
            {
                items.map((item)=>{
                    return (
                        <ProductCard key={item._id} product={item}/>
                    )
                    
                })
            }
        </div>
    </div>
  )
}

export default Wishlist