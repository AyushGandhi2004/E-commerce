import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import { UserContext } from '../../context/User';
import api from '../../api';
import {Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon} from '@heroicons/react/24/outline'

const AdminNavBar = () => {
    const {user , setUser} = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = ()=>{
        setIsMenuOpen((prev)=>(!prev))
    }

    const handleLogout = async ()=>{
        try {
            const res = await api.post('/auth/logout');
            if(res.status == 200) {
                setUser(false);
                navigate('/login');
            }
        } catch (error) {
            console.log(`Error in logging out : ${error}`);
        }
    }

    return (
        <div className='sticky top-0 z-50'>
            <div className='flex items-center justify-between bg-gradient-to-r from-[var(--color-bg-secondary)] to-[var(--color-bg-secondary)] shadow-lg border-b border-[var(--color-primary-light)]/20'>
                {/* Hamburger Menu */}
                <button 
                    className='md:hidden p-4 text-[var(--color-text-primary)] hover:text-[var(--color-primary-dark)] transition-colors'
                    onClick={toggleMenu}
                >
                    {!isMenuOpen ? (
                        <Bars3Icon className='h-6 w-6'/>
                    ) : (
                        <XMarkIcon className='h-6 w-6'/>
                    )}
                </button>

                {/* Logo */}
                <Link to='/admin' className='flex-grow md:flex-grow-0 text-center md:text-left'>
                    <h1 className='text-2xl md:text-3xl font-bold heading-gradient'>
                        ✨ Admin Panel
                    </h1>
                </Link>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className='hidden md:flex items-center gap-2 px-4 py-2 m-4 rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary-deep)] border border-[var(--color-primary-light)] font-semibold text-sm hover:shadow-md transition-all'
                >
                    <ArrowRightOnRectangleIcon className='w-4 h-4' />
                    Logout
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-16 left-0 h-full w-3/4 transform transition-transform duration-300 md:hidden ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } bg-white shadow-xl z-40`}>
                <div className="flex flex-col gap-2 p-6">
                    <NavLink 
                        to='/admin' 
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                                isActive 
                                    ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-deep)] border border-[var(--color-primary-light)]' 
                                    : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                            }`
                        }
                    >
                        <Cog6ToothIcon className='w-5 h-5' />
                        Dashboard
                    </NavLink>

                    <NavLink 
                        to='/admin/product' 
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                                isActive 
                                    ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-deep)] border border-[var(--color-primary-light)]' 
                                    : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                            }`
                        }
                    >
                        📦 Products
                    </NavLink>

                    <button
                        onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                        }}
                        className='flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-error)] font-semibold hover:bg-red-50 transition-colors mt-4'
                    >
                        <ArrowRightOnRectangleIcon className='w-5 h-5' />
                        Logout
                    </button>
                </div>
            </div>

            {/* Desktop Menu */}
            <div className='hidden md:flex items-center justify-center gap-8 px-6 py-4 bg-[var(--color-bg-primary)]'>
                <NavLink 
                    to='/admin' 
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                            isActive 
                                ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-deep)] border border-[var(--color-primary-light)]' 
                                : 'text-[var(--color-text-primary)] hover:text-[var(--color-primary-dark)]'
                        }`
                    }
                >
                    <Cog6ToothIcon className='w-5 h-5' />
                    Dashboard
                </NavLink>

                <NavLink 
                    to='/admin/product' 
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                            isActive 
                                ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-deep)] border border-[var(--color-primary-light)]' 
                                : 'text-[var(--color-text-primary)] hover:text-[var(--color-primary-dark)]'
                        }`
                    }
                >
                    📦 Products
                </NavLink>
            </div>
        </div>
    )
}

export default AdminNavBar