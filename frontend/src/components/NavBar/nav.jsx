// Nav.jsx

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="bg-white shadow-md sticky top-0 z-50 justify-between ">
            <div className="container mx-auto px-4 py-4 flex justify-between items-left w-[70%]">
                
                {/* Brand Logo */}
                <Link to="/" className="text-2xl font-bold text-black-600">
                    E-commerce
                </Link>

                {/* Desktop Menu - 'hidden' class removed */}
                <div className="flex justify-around items-center space-x-8 text-lg w-[20%]">
                    <NavLink 
                        to="/" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/wishlist" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Wishlist
                    </NavLink>
                    <NavLink 
                        to="/cart" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Cart
                    </NavLink>
                    <NavLink 
                        to="/login" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavBar;