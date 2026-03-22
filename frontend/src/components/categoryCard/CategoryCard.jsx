import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const CategoryCard = ({ name, image }) => {
    const [imageError, setImageError] = React.useState(false);

    return (
        <Link
            to={`/products/category/${name}`}
            className="group relative overflow-hidden rounded-2xl border border-[var(--color-primary-light)]/55 shadow-sm hover:shadow-md transition-all duration-300 h-56 md:h-64 block"
        >
            {/* Background Image or Gradient */}
            <div className="absolute inset-0 gradient-lavender">
                {!imageError && image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-soft)]" />
                )}
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/10 group-hover:from-black/60 transition-all duration-300" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <h3 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-md text-left group-hover:translate-y-[-2px] transition-transform duration-300">
                    {name}
                </h3>
                <p className="text-white/90 text-sm mt-1 drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    Explore Collection
                </p>
            </div>

            {/* Floating Arrow Icon */}
            <div className="absolute bottom-4 right-4 bg-white/25 backdrop-blur-sm p-2.5 rounded-xl group-hover:bg-white/35 group-hover:translate-x-0.5 transition-all duration-300 border border-white/40">
                <ArrowRightIcon className="w-5 h-5 text-white" />
            </div>
        </Link>
    );
};

export default CategoryCard;