import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlaceholderImage from "../PlaceholderImage/PlaceholderImage";
import { StarIcon } from "@heroicons/react/24/solid";

const ProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <Link to={`/product/${product._id}`} className="block h-full">
            <div className="card flex flex-col items-center justify-between h-full group overflow-hidden rounded-2xl">
                {/* Image Container */}
                <div className="relative w-full aspect-square gradient-lavender overflow-hidden flex items-center justify-center border-b border-[var(--color-primary-light)]/45">
                    {!imageError && product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-soft)]">
                            <PlaceholderImage width={160} height={160} />
                        </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                </div>

                {/* Product Info */}
                <div className="flex flex-col items-start w-full px-4 md:px-5 py-4 flex-grow justify-between gap-2">
                    {/* Product Name */}
                    <div className="w-full">
                        <h3 className="text-sm md:text-base font-semibold text-[var(--color-text-primary)] overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-[var(--color-primary-dark)] transition-colors">
                            {product.name}
                        </h3>
                        {/* Optional: Truncated description */}
                        <p className="text-xs text-[var(--color-text-light)] mt-1 line-clamp-2 min-h-8 leading-relaxed">
                            {product.description && product.description.substring(0, 40) + "..."}
                        </p>
                    </div>

                    {/* Price and Rating */}
                    <div className="w-full flex justify-between items-end mt-2">
                        <div className="flex flex-col">
                            <span className="text-xs text-[var(--color-text-light)]">Price</span>
                            <span className="text-base md:text-xl font-semibold text-[var(--color-primary-deep)]">
                                Rs. {product.price}
                            </span>
                        </div>

                        {/* Rating placeholder */}
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary-light)]/65">
                            <StarIcon className="w-4 h-4 text-[var(--color-accent-yellow)]" />
                            <span className="text-xs text-[var(--color-text-light)]">4.5</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;