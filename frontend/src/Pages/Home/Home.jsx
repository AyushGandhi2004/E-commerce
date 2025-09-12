
import React from 'react';
import SearchBar from '../../components/search bar/search';
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
        <div>
            <Banner />
            <SearchBar />

            
            <section className="container mx-auto px-4 md:py-4" id="categories">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-8">
                    Shop by Category
                </h2>
                
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.name}
                            name={category.name}
                            image={category.image}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;