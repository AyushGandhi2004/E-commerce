
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
    return (
        <div className="bg-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex relative max-w-2xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full py-3 pl-5 pr-12 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                    <button className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-gray-500 hover:text-blue-600">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;