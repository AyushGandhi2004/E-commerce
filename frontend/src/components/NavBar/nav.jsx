// Nav.jsx

import React, { useContext, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/User';
import api from '../../api';

const NavBar = () => {
    const {user , setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async ()=>{
        try {
            const res = await api.post('/auth/logout');
            if(res.status == 200) setUser(false);
        } catch (error) {
            console.log(`Error in logging out : ${error}`);
        }
    }
    const handleButton = ()=>{
        if(user){
            handleLogout();
        }
        else {
            navigate('/login');
        }
    }

    return (
        <div className="bg-white shadow-md sticky top-0 z-50 justify-evenly w-full">
            <div className="container mx-auto px-4 py-4 flex justify-evenly items-center ">
                
                {/* Brand Logo */}
                <Link to="/" className="sm:text-sm md:text-lg lg:text-xl font-bold text-black-600 w-full">
                    E-commerce
                </Link>

                {/* Desktop Menu - 'hidden' class removed */}
                <div className="flex justify-between lg:justify-around items-center sm: text-xs md:text-lg lg:text-xl w-full">
                    <NavLink 
                        to="/" 
                        className={({isActive})=>`  rounded-full px-2 py-1  ${isActive ? "text-white bg-blue-500 shadow-lg opacity-85" : "text-gray-600 hover:text-blue-500"}`}
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/wishlist" 
                        className={({isActive})=>`  rounded-full px-2 py-1  ${isActive ? "text-white bg-blue-500 shadow-lg opacity-85" : "text-gray-600 hover:text-blue-500"}`}
                    >
                        Wishlist
                    </NavLink>
                    <NavLink 
                        to="/cart" 
                        className={({isActive})=>`  rounded-full px-2 py-1  ${isActive ? "text-white bg-blue-500 shadow-lg opacity-85" : "text-gray-600 hover:text-blue-500"}`}
                    >
                        Cart
                    </NavLink>
                    
                    <button type="button" className="text-gray-600 hover:text-blue-500 transition-colors cursor-pointer" onClick={handleButton}>
                        {user ? "LogOut" : "LogIn"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;