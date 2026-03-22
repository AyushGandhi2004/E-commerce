
import React from 'react';
import SearchBar from '../../components/searchbar/search';
import Banner from '../../components/Banner/banner';
import CategoryCard from '../../components/categoryCard/CategoryCard';

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
                    <p className="text-xs md:text-sm uppercase tracking-[0.24em] text-[var(--color-primary-deep)]/70 font-semibold mb-3">
                        Explore Collections
                    </p>
                    <h2 className="section-title heading-gradient pb-1.5">
                        Shop by Category
                    </h2>
                    <div className="flex items-center justify-center gap-3 mb-4 mt-4">
                        <span className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-[var(--color-primary-light)]" />
                        <span className="w-2 h-2 rounded-full bg-[var(--color-primary-dark)]/70" />
                        <span className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-[var(--color-primary-light)]" />
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