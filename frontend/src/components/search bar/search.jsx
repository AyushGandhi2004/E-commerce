
import React, { useContext } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../api';
import SearchResults from '../../Pages/SearchResults';
import { SearchInputContext } from '../../context/SearchInput';
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const {input,setInput,search,data,cache} = useContext(SearchInputContext);
    const navigate = useNavigate();

    // useEffect(()=>{
    //     const timer = setTimeout(search,500);
    //     return (()=>clearTimeout(timer));
    // },[input]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(input){
            //search(input);
            navigate(`/search/${input}`);
        }
    }
    

    return (
        <div className="p-2 m-2 md:p-4 md:m-8">
            <div className="container mx-auto px-4">
                <form className="flex relative max-w-3xl mx-auto " onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                        placeholder="Search for products..."
                        className="w-full py-1 md:py-3 lg:py-4 pl-5 pr-12 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                    <button className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-gray-500 hover:text-blue-600">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
            {/* {data && (
                <div className='max-h-40 overflow-y-scroll'>
                    {
                        data.map((product)=>{
                            <div key={product._id}>{product.name}</div>
                        })
                    }
                </div>
            )} */}
        </div>
    );
};

export default SearchBar;