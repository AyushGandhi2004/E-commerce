import React from "react";

const SearchBar = () => {
    return(
        <div className="flex justify-center items-center mt-4 w-full">
            <input type="text"  placeholder="Search..." className="w-max"/>
            <button>
                <img src="/search.svg" alt="" />
            </button>
        </div>
    )
};

export default SearchBar;