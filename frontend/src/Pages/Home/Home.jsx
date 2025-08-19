import React from "react";
import NavBar from "../../components/NavBar/nav";
import SearchBar from "../../components/search bar/search";
import Banner from "../../components/Banner/banner";

const Home = () => {
    return(
        <div>
            <NavBar />
            <Banner />
            <SearchBar />
            <p className="flex justify-center center">
                One Stop Solution For All Your Needs:
            </p>
            <div>
                
            </div>
        </div>
    )
}

export default Home;