import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/nav";
import { useParams } from "react-router-dom";
import api from "../../api";
import ProductCard from "../../components/ProductCard/ProductCard";

const CategoryProducts = () => {
    const {category} = useParams();
    //declaring states for products and loading:
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    //Make an api call using useEffect to feth the products of the category and then assign it to products state and setLoading false on completion i.e. finally. Also make sure to set dependancy array to category so if someone changes the category via url it will fetch the products of that category:
    useEffect(()=>{
        const fetchProducts = async ()=>{
            try {
                const response = await api.get(`/product/category/${category}`);
                if(response.status === 200){
                    setProducts(response.data.products);
                }else{
                    console.error("Failed to fetch products");
                }
            } catch (error) {
                console.log("Error fetching products:", error);
            }finally{
                setLoading(false);
            }
        };
        fetchProducts();
    },[category]);

    if(loading){
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            
            <h1 className="text-2xl font-bold mt-4">Products in {category} Category</h1>
            <div className="grid grid-cols-3 gap-4 p-4 w-full h-full">
                {
                    products.map((product) => {
                        return <ProductCard key={product._id} product={product}/>
                    })
                }
            </div>
        </div>
    )
};

export default CategoryProducts;