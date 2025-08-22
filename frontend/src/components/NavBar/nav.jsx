import React from "react";
import "./nav.css";

const NavBar = () =>{
    return (
        <nav className="w-full shadow-md top-0 left-0 bg-white z-50 flex justify-between sticky">
            <div className="">
                {/* <img src="/logo.png" alt="logo" className="h-10 w-10"/> */}
                <a href="/home" className="text-xl font-bold text-gray-800">E-commerce</a>
            </div>
            <div className="flex justify-between grid grid-cols-4 w-1/3 gap-4">
                <a href="/home" className="cursor-pointer flex justify-centre text-gray-800">Home</a>
                <a href="/cart" className="cursor-pointer flex justify-centre text-gray-800">Cart</a>
                <a href="/wishlist" className="cursor-pointer flex justify-centre text-gray-800">Wishlist</a>
                <a href="/login" className="cursor-pointer flex justify-centre text-gray-800">Login</a>
            </div>
            
        </nav>
    )
}

export default NavBar;