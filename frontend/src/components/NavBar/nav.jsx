// Nav.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 justify-between">
            <div className="container mx-auto px-4 py-4 flex justify-between items-left w-[70%]">
                
                {/* Brand Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    E-commerce
                </Link>

                {/* Desktop Menu - 'hidden' class removed */}
                <div className="flex justify-around items-center space-x-8 text-lg w-[30%]">
                    <Link 
                        to="/" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Home
                    </Link>
                    <Link 
                        to="/wishlist" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Wishlist
                    </Link>
                    <Link 
                        to="/cart" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Cart
                    </Link>
                    <Link 
                        to="/login" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;