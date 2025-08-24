
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

            {/* This section is the key. 'container mx-auto' gives it proper width. */}
            <section className="container mx-auto px-4 py-12" id="categories">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Shop by Category
                </h2>
                
                {/* This grid will now have space to create 3 columns */}
                <div className="grid grid-cols-3 gap-8">
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