import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/User';
import api from '../../api';

const AdminNavBar = () => {
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
    <div className="bg-white shadow-md sticky top-0 z-50 justify-between ">
            <div className="container mx-auto px-4 py-4 flex justify-between items-left w-[70%]">
                
                {/* Brand Logo */}
                <Link to="/admin" className="text-2xl font-bold text-black-600">
                    E-commerce
                </Link>

                {/* Desktop Menu - 'hidden' class removed */}
                <div className="flex justify-around items-center space-x-8 text-lg w-[20%]">
                    <NavLink 
                        to="/admin" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Orders
                    </NavLink>
                    <NavLink 
                        to="" 
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        Products
                    </NavLink>
                    
                    <button type="button" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={handleButton}>
                        {user ? "LogOut" : "LogIn"}
                    </button>
                </div>
            </div>
        </div>
  )
}

export default AdminNavBar