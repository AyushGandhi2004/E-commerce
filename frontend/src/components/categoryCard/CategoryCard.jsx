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
        
        <Link
            to={`/products/category/${name}`}
            className="relative block rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
        >
            <div className="h-60 w-full">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-70"
                />
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-opacity-40">
                <h3 className="text-shadow-gray-800 text-2xl font-bold drop-shadow-md">{name}</h3>
            </div>
        </Link>
    );
};

export default CategoryCard;