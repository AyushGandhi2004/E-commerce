// Nav.jsx
import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/User';
import api from '../../api';
import { ShoppingCartIcon, HeartIcon, UserCircleIcon, ArrowRightOnRectangleIcon, HomeIcon } from '@heroicons/react/24/outline';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await api.post('/auth/logout');
            if (res.status == 200) setUser(false);
            navigate('/');
        } catch (error) {
            console.log(`Error in logging out : ${error}`);
        }
    }

    const handleButton = () => {
        if (user) {
            handleLogout();
        }
        else {
            navigate('/login');
        }
    }

    return (
        <header className="sticky top-0 z-50 pt-2 md:pt-3">
            <div className="page-shell">
                <div className="glass-surface rounded-2xl md:rounded-full px-3 md:px-4 py-2 md:py-2.5 flex items-center justify-between gap-3">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl md:text-3xl lg:text-4xl font-bold heading-gradient hover:opacity-90 transition-opacity whitespace-nowrap pl-2.5"
                    >
                        ShopIn
                    </Link>

                    {/* Desktop Navigation Menu */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-2 p-1 rounded-full bg-white/60 border border-[var(--color-primary-light)]/40">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-full ${
                                    isActive
                                        ? 'text-[var(--color-primary-deep)] bg-[var(--color-primary-soft)] border border-[var(--color-primary-light)]/60 shadow-sm'
                                        : 'text-[var(--color-text-primary)] hover:text-[var(--color-primary-deep)] hover:bg-[var(--color-primary-soft)]/70'
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/wishlist"
                            className={({ isActive }) =>
                                `px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 flex items-center gap-2 rounded-full ${
                                    isActive
                                        ? 'text-[var(--color-primary-deep)] bg-[var(--color-primary-soft)] border border-[var(--color-primary-light)]/60 shadow-sm'
                                        : 'text-[var(--color-text-primary)] hover:text-[var(--color-primary-deep)] hover:bg-[var(--color-primary-soft)]/70'
                                }`
                            }
                        >
                            <HeartIcon className="w-5 h-5" />
                            Wishlist
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                `px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 flex items-center gap-2 rounded-full ${
                                    isActive
                                        ? 'text-[var(--color-primary-deep)] bg-[var(--color-primary-soft)] border border-[var(--color-primary-light)]/60 shadow-sm'
                                        : 'text-[var(--color-text-primary)] hover:text-[var(--color-primary-deep)] hover:bg-[var(--color-primary-soft)]/70'
                                }`
                            }
                        >
                            <ShoppingCartIcon className="w-5 h-5" />
                            Cart
                        </NavLink>
                    </nav>

                    {/* User Button */}
                    <div className="flex items-center gap-2">
                        {user ? (
                            <button
                                onClick={handleButton}
                                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary-deep)] border border-[var(--color-primary-light)]/70 font-semibold text-sm hover:shadow-md hover:bg-[var(--color-primary-light)]/80 transition-all"
                            >
                                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary-deep)] border border-[var(--color-primary-light)]/70 font-semibold text-sm hover:shadow-md hover:bg-[var(--color-primary-light)]/80 transition-all"
                            >
                                <UserCircleIcon className="w-4 h-4" />
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Icons */}
                        <div className="md:hidden flex items-center gap-1 rounded-full bg-white/70 border border-[var(--color-primary-light)]/40 p-1">
                            <Link to="/" className="p-2 rounded-full text-[var(--color-text-primary)] hover:text-[var(--color-primary-deep)] hover:bg-[var(--color-primary-soft)]/70 transition-colors">
                                <HomeIcon className="w-5 h-5" />
                            </Link>
                            <Link to="/cart" className="p-2 rounded-full text-[var(--color-text-primary)] hover:text-[var(--color-primary-deep)] hover:bg-[var(--color-primary-soft)]/70 transition-colors">
                                <ShoppingCartIcon className="w-5 h-5" />
                            </Link>
                            <Link to="/wishlist" className="p-2 rounded-full text-[var(--color-text-primary)] hover:text-[var(--color-primary-deep)] hover:bg-[var(--color-primary-soft)]/70 transition-colors">
                                <HeartIcon className="w-5 h-5" />
                            </Link>
                            <button onClick={handleButton} className="p-2 rounded-full text-[var(--color-text-primary)] hover:text-[var(--color-primary-deep)] hover:bg-[var(--color-primary-soft)]/70 transition-colors">
                                <UserCircleIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;