import React, { useContext, useEffect } from 'react'
import SearchBar from '../components/searchbar/search'
import { SearchInputContext } from '../context/SearchInput'
import ProductCard from '../components/ProductCard/ProductCard'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import 'react-loading-skeleton/dist/skeleton.css'

const SearchResults = () => {
  const {data,setInput,search,searchLoading} = useContext(SearchInputContext);
  const {query} = useParams();

  useEffect(()=>{
    setInput(query);
    search(query);
  },[query])
  
  if(!searchLoading && data.length==0) {
    return (
      <>
        <SearchBar/>
        <div className='min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center px-4'>
          <div className='text-center'>
            <MagnifyingGlassIcon className='w-20 h-20 mx-auto text-[var(--color-primary-light)] mb-4 opacity-50' />
            <h2 className='text-3xl font-bold text-[var(--color-text-primary)] mb-2'>
              No Products Found
            </h2>
            <p className='text-[var(--color-text-secondary)]'>
              Try searching with different keywords
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='min-h-screen bg-[var(--color-bg-primary)]'>
        <SearchBar/>
      <div className='page-shell pb-12'>
          {/* Results Header */}
          <div className='mb-7 rounded-2xl md:rounded-3xl surface-block px-5 md:px-7 py-5 md:py-6'>
            {searchLoading ? (
              <Skeleton height={40} width={300} containerClassName='flex-1'/>
            ) : (
              <div>
                <h2 className='text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2'>
                  Search Results for "{query}"
                </h2>
                <p className='text-[var(--color-text-secondary)]'>
                  Found {data.length} product{data.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className='product-grid'>
            {
              searchLoading? 
              Array(8).fill().map((_,i)=>(
                <Skeleton key={i} height={250}/>
              )):
              data.map((product)=>(
                <div key={product._id} className='w-full'>
                   <ProductCard product={product}/>
                </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default SearchResults