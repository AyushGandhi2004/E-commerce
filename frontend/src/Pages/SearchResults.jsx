import React, { useContext, useEffect } from 'react'
import SearchBar from '../components/search bar/search'
import { SearchInputContext } from '../context/SearchInput'
import ProductCard from '../components/ProductCard/ProductCard'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SearchResults = () => {
  const {data,setInput,search,searchLoading} = useContext(SearchInputContext);
  const {query} = useParams();

  useEffect(()=>{
    setInput(query);
    search(query);
  },[query])
  
  if(!searchLoading && data.length==0) return (
    <>
      <SearchBar/>
      <div className=' flex justify-center items-center'>
        No Products Found!
      </div>
    </>
    
  )

  return (
    <div>
        <SearchBar/>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full h-full'>
            {
              searchLoading? 
              Array(8).fill().map((_,i)=>(
                <Skeleton key={i} height={250}/>
              )):
            data.map((product)=>(
              <div key={product._id} className='w-full'>
                 <ProductCard product={product}/>
              </div>
            ))}
        </div>
    </div>
  )
}

export default SearchResults