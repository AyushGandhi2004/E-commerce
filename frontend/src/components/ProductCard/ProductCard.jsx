import React from "react";

const ProductCard = ({product}) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-100">
            <div>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            </div>
            <div className="mt-2 text-lg font-semibold">{product.name}</div>
            <div className="text-gray-600">${product.price}</div>
        </div>
    )
};

export default ProductCard;