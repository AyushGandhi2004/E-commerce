import React, { useState } from 'react'
import TagsInput from './TagsInput';
import ImageUpload from './ImageUpload';
import api from '../../../api';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const AddProduct = ({ onSuccess }) => {
    const [name,setName]=useState("");
    const [image, setImage] = useState(null);
    const [price,setPrice]=useState("");
    const [category, setCategory]=useState("");
    const [description , setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const createSlug = (name)=>{
        return name
          .toLowerCase()                 
          .trim()                        
          .replace(/[^a-z0-9\s-]/g, "")  
          .replace(/\s+/g, "-")          
          .replace(/-+/g, "-");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        // Validation
        if (!name.trim()) {
            setMessage({ type: 'error', text: 'Product name is required' });
            return;
        }
        if (!price || price <= 0) {
            setMessage({ type: 'error', text: 'Valid price is required' });
            return;
        }
        if (!category) {
            setMessage({ type: 'error', text: 'Please select a category' });
            return;
        }

        const slug = createSlug(name);
        setLoading(true);

        try {
            const response = await api.post('/product/',
                [
                    {
                        name,
                        price: parseFloat(price),
                        category,
                        imageUrl: image,
                        description,
                        slug,
                        tags,
                    }
                ]
            );
            
            if(response.status === 201) {
                setMessage({ type: 'success', text: 'Product added successfully!' });
                // Reset form
                setName("");
                setImage(null);
                setPrice("");
                setCategory("");
                setDescription("");
                setTags([]);
                
                // Call onSuccess callback if provided
                if (onSuccess) {
                    setTimeout(() => onSuccess(), 1500);
                }
            }
        } catch (error) {
            console.log("Error in adding product:", error);
            setMessage({ type: 'error', text: error.response?.data?.message || 'Error adding product. Please try again.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Success/Error Messages */}
            {message.text && (
                <div className={`p-4 rounded-lg flex items-start gap-3 ${
                    message.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                    {message.type === 'success' ? (
                        <CheckCircleIcon className='w-5 h-5 flex-shrink-0 mt-0.5' />
                    ) : (
                        <ExclamationCircleIcon className='w-5 h-5 flex-shrink-0 mt-0.5' />
                    )}
                    <span>{message.text}</span>
                </div>
            )}

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-3">
                    Product Image
                </label>
                <ImageUpload setImage={setImage}/>
            </div>

            {/* Product Name */}
            <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                    Product Name *
                </label>
                <input
                    type="text"
                    placeholder='Enter product name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                    className='w-full px-4 py-3 border-2 border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:border-[var(--color-primary-dark)] focus:ring-4 focus:ring-[var(--color-primary-light)]/30 transition-all text-[var(--color-text-primary)] placeholder-[var(--color-text-light)]'
                />
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                    Price (Rs.) *
                </label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    placeholder='Enter product price'
                    required
                    className='w-full px-4 py-3 border-2 border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:border-[var(--color-primary-dark)] focus:ring-4 focus:ring-[var(--color-primary-light)]/30 transition-all text-[var(--color-text-primary)] placeholder-[var(--color-text-light)]'
                />
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                    Category *
                </label>
                <select
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    required
                    className='w-full px-4 py-3 border-2 border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:border-[var(--color-primary-dark)] focus:ring-4 focus:ring-[var(--color-primary-light)]/30 transition-all text-[var(--color-text-primary)] bg-white'
                >
                    <option value="" disabled>-- Select a category --</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Books">Books</option>
                    <option value="Home">Home</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Sports">Sports</option>
                    <option value="Beauty">Beauty</option>
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                    Description
                </label>
                <textarea
                    placeholder='Enter product description'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    rows="4"
                    className='w-full px-4 py-3 border-2 border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:border-[var(--color-primary-dark)] focus:ring-4 focus:ring-[var(--color-primary-light)]/30 transition-all text-[var(--color-text-primary)] placeholder-[var(--color-text-light)] resize-none'
                />
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                    Tags
                </label>
                <TagsInput tags={tags} setTags={setTags}/>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className='w-full py-3 btn-primary font-semibold text-[var(--color-primary-deep)] transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
                {loading ? 'Adding Product...' : 'Add Product'}
            </button>
        </form>
    )
}

export default AddProduct