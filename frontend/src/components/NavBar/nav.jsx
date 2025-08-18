import React from "react";
import "./nav.css";

const NavBar = () =>{
    return (
        <nav className="fixed top-2 left-2 right-2 w-full flex items-center justify-between px-8 h-16 bg-white shadow z-50">
            <div className="inline-flex items-center gap-4">
                {/* <img src="/logo.png" alt="logo" className="h-10 w-10"/> */}
                <h3 className="font-bold text-lg">E-commerce</h3>
            </div>
            <div className="flex items-center gap-8 font-medium">
                <div className="cursor-pointer">Home</div>
                <div className="cursor-pointer">Cart</div>
                <div className="cursor-pointer">Wishlist</div>
                <div className="cursor-pointer">Profile</div>
            </div>
            
        </nav>
    )
}

export default NavBar;