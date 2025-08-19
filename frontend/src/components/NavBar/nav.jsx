import React from "react";
import "./nav.css";

const NavBar = () =>{
    return (
        <nav className="justify-between h-8 flex">
            <div className="">
                {/* <img src="/logo.png" alt="logo" className="h-10 w-10"/> */}
                <h3 className="font-bold text-lg">E-commerce</h3>
            </div>
            <div className="flex justify-between grid grid-cols-4 w-1/3 gap-4">
                <div className="cursor-pointer flex justify-centre">Home</div>
                <div className="cursor-pointer flex justify-centre">Cart</div>
                <div className="cursor-pointer flex justify-centre">Wishlist</div>
                <div className="cursor-pointer flex justify-centre">Profile</div>
            </div>
            
        </nav>
    )
}

export default NavBar;