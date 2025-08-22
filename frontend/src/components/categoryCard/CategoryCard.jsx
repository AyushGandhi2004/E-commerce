// import React from "react";

// const CategoryCard = ({ name,image }) => {
//     return (
//         <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-100">
//             <div>
//                 <img src={image} alt={name} className="w-ful object-cover "/>
//             </div>
//             <div className="">{name}</div>
//             <a href={`/products/category/${name}`}></a>
//         </div>
//     )
// }

// export default CategoryCard;

import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ name, image }) => {
    return (
        // 1. The <Link> is now the main component.
        //    'block' makes the link behave like a div.
        <Link
            to={`/products/category/${name}`}
            className="relative block rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
        >
            {/* The image and text are now children of the link */}
            <div className="h-64 w-full">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* The text overlay remains the same */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <h3 className="text-white text-2xl font-bold drop-shadow-md">{name}</h3>
            </div>
        </Link>
    );
};

export default CategoryCard;