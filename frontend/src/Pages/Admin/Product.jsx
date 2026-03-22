import React from 'react'
import SearchBar from '../../components/searchbar/search';
import AddProduct from './Components/AddProduct';
import { useContext,useState,useEffect } from 'react'
import { UserContext } from '../../context/User'
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from '@heroicons/react/24/outline';

const Product = () => {
  const { user , setUser } = useContext(UserContext);
  const [isAdmin,setIsAdmin] = useState(false);
  const [addProduct , setAddProduct] =useState(false);
  const navigate = useNavigate();

  const checkAdmin = async ()=>{
      try {
          const response = await api.get('/auth/admin/me');
          if(response.status == 200) setIsAdmin(true);
      } catch (error) {
          console.log("You are not an admin");
          navigate('/login');
      }
  }

  useEffect(()=>{
      if(!user){
          navigate('/login');
      }
      checkAdmin();
  },[user]);

  const toggleAddProduct = ()=>{
    setAddProduct((prev)=>(!prev));
  }

  if(!isAdmin) {
    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center px-4">
            <div className="card p-8 text-center max-w-md">
                <h2 className="text-2xl font-bold text-[var(--color-error)] mb-2">Access Denied</h2>
                <p className="text-[var(--color-text-secondary)]">Only admins can access this page</p>
            </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Search Bar */}
      <div className='w-full'>
        <SearchBar/>
      </div>

      <div className="page-shell section-gap">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold heading-gradient mb-2">
            Manage Products
          </h1>
          <p className="text-[var(--color-text-secondary)]">Add and manage your store's product inventory</p>
        </div>

        {/* Add Product Button */}
        <button
          onClick={toggleAddProduct}
          className="mb-8 inline-flex items-center gap-2 px-6 py-3 btn-primary text-[var(--color-primary-deep)] font-semibold transition-all"
        >
          <PlusIcon className='h-5 w-5'/>
          <span>Add New Product</span>
          {addProduct ? (
            <ChevronUpIcon className='h-5 w-5'/>
          ) : (
            <ChevronDownIcon className='h-5 w-5'/>
          )}
        </button>

        {/* Add Product Form */}
        {addProduct && (
          <div className="mb-12">
            <div className="card p-6 md:p-8">
              <AddProduct onSuccess={() => setAddProduct(false)} />
            </div>
          </div>
        )}

        {/* Products List Section */}
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
            Product Inventory
          </h2>
          <p className="text-[var(--color-text-secondary)] pb-4">
            Coming soon: Detailed product listings and management tools
          </p>
          <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-8 text-center">
            <p className="text-[var(--color-text-light)]">
              Products added will appear here for easy management
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product