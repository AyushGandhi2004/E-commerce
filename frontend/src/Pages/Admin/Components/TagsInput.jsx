import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid';

const TagsInput = ({tags, setTags}) => {
    const [input , setInput] =useState("");

    const handleOnKeyDown = (e)=>{
        if(e.key==='Enter' && input.trim()!=""){
            e.preventDefault();
            if(!tags.includes(input.trim()))setTags((prev)=>([...prev,input.trim()]));
            setInput('');
        }
    }

    const handleRemove = (tagToRemove)=>{
        setTags(tags.filter((tag)=>(tag!==tagToRemove)));
    }

    return (
        <div className='space-y-3'>
            {/* Input Field */}
            <input
                type="text"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                placeholder='Add tags (press Enter):'
                onKeyDown={handleOnKeyDown}
                className='w-full px-4 py-3 border-2 border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:border-[var(--color-primary-dark)] focus:ring-4 focus:ring-[var(--color-primary-light)]/30 transition-all text-[var(--color-text-primary)] placeholder-[var(--color-text-light)]'
            />

            {/* Tags Container */}
            {tags.length > 0 && (
                <div className='flex flex-wrap gap-2 p-3 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-primary-light)]/30'>
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className='flex items-center gap-2 bg-[var(--color-primary-soft)] text-[var(--color-primary-deep)] border border-[var(--color-primary-light)] rounded-lg px-3 py-1 text-sm font-medium'
                        >
                            <span>{tag}</span>
                            <button
                                type="button"
                                onClick={() => handleRemove(tag)}
                                className='hover:opacity-80 transition-opacity'
                            >
                                <XMarkIcon className='h-4 w-4' />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Info Text */}
            {tags.length === 0 && (
                <p className='text-xs text-[var(--color-text-light)]'>
                    No tags added yet. Type a tag and press Enter to add it.
                </p>
            )}
        </div>
    )
}

export default TagsInput