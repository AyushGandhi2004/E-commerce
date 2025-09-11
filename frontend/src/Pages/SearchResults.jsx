import React, { useContext, useEffect } from 'react'
import SearchBar from '../components/search bar/search'
import { SearchInputContext } from '../context/SearchInput'
import ProductCard from '../components/ProductCard/ProductCard'
import { useParams } from 'react-router-dom'

const SearchResults = () => {
  const {data,setInput,search} = useContext(SearchInputContext);
  const {query} = useParams();

  useEffect(()=>{
    setInput(query);
    search(query);
  },[query])
  
  if(data.length==0) return (
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
        <div className='grid grid-cols-4 w-full gap-4 p-4'>
            {data.map((product)=>(
              <div key={product._id} className='w-full'>
                 <ProductCard product={product}/>
              </div>
            ))}
        </div>
    </div>
  )
}

export default SearchResults