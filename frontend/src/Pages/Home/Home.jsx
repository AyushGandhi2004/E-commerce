
import React from 'react';
import SearchBar from '../../components/searchbar/search';
import Banner from '../../components/Banner/banner';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import { SparklesIcon } from '@heroicons/react/24/outline';

const categories = [
    { name: "Electronics", image: "/electronicsCategory.jpeg" },
    { name: "Fashion", image: "/fashionCategory.jpeg" },
    { name: "Home", image: "/homeCategory.jpg" },
    { name: "Beauty", image: "/beautyCategory.jpeg" },
    { name: "Sports", image: "/sportsCategory.jpeg" },
    { name: "Books", image: "/booksCategory.png" }
];

const Home = () => {
    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)]">
            {/* Banner */}
            <Banner />
            
            {/* Search Bar */}
            <SearchBar />

            {/* Categories Section */}
            <section className="page-shell section-gap">
                {/* Section Header */}
                <div className="mb-10 md:mb-12 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 mb-3 px-5 md:px-6 py-3 md:py-3.5 rounded-2xl bg-white/70 border border-[var(--color-primary-light)]/60">
                        <SparklesIcon className="w-5 h-5 text-[var(--color-primary-dark)]" />
                        <h2 className="section-title heading-gradient">
                            Shop by Category
                        </h2>
                        <SparklesIcon className="w-5 h-5 text-[var(--color-primary-dark)]" />
                    </div>
                    <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
                        Explore our carefully curated collections across all categories
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.name}
                            name={category.name}
                            image={category.image}
                        />
                    ))}
                </div>

                {/* Decorative divider */}
                <div className="mt-12 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--color-primary-light)]" />
                    <p className="text-sm text-[var(--color-text-light)]">Featured</p>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--color-primary-light)]" />
                </div>
            </section>
        </div>
    );
};

export default Home;