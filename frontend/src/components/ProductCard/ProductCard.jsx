import React from "react";
import { Link } from "react-router-dom";
//import {Link} from "react-router-dom"

const ProductCard = ({product}) => {
    return (
        <Link to={`/product/${product._id}`}>
        <div className="flex flex-col items-center justify-between z-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 aspect-[4/5] w-full">
            <div>
                <img src={product.imageUrl} alt={product.name} className="w-full aspect-square object-cover rounded-t-lg shadow-md z-10" />
            </div>
            <div className="flex flex-col items-left align-middle w-full mb-1">
                <div className="mt-2 px-2 text-sm md:text-md lg:text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.name}
                </div>
                <div className="text-gray-600 mb-1 px-2">
                    Rs. {product.price}
                </div>
            </div>
        </div>
        </Link>
    )
};

export default ProductCard;