import React from "react";

const ProductCard = ({product}) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-80">
            <div>
                <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover" />
            </div>
            <div className="flex justify-between items-center align-middle w-full">
                <div className="m-2 text-800 font-semibold">
                    {product.name}
                </div>
                <div className="text-gray-600 outline-1 rounded-xl m-2">
                    ${product.price}
                </div>
            </div>
        </div>
    )
};

export default ProductCard;