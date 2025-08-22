import React from "react";
import NavBar from "../../components/NavBar/nav";
import SearchBar from "../../components/search bar/search";
import Banner from "../../components/Banner/banner";
import CategoryCard from "../../components/categoryCard/CategoryCard";

const categories = [
    {name : "electronics" , image : "/electronicsCatgory.jpeg"},
    {name : "fashion" , image : "/fashionCategory.jpeg"},
    {name : "home", image : "/homeCategory.jpg"},
    {name : "beauty", image : "/beautyCategory.jpeg"},
    {name : "sports", image : "/sportsCategory.jpeg"},
    {name : "books", image : "/booksCategory.png"}
]

const Home = () => {
    
    return(
        <div className="flex flex-col justify-center w-full h-screen">
            <header className="w-full align-top">
                <NavBar />
            </header>
            
            <Banner />
            <SearchBar />
            <p className="flex justify-center center">
                One Stop Solution For All Your Needs:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 p-4">
                <div className="grid grid-cols-3 gap-4 justify-around w-full ">
                    {categories.map((category ) => (
                        <CategoryCard key={category.name}  name={category.name} image = {category.image} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;