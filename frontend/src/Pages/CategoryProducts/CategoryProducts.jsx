import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/nav";
import { useParams } from "react-router-dom";
import api from "../../api";
import ProductCard from "../../components/ProductCard/ProductCard";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CategoryProducts = () => {
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)]">
            {/* Page Header */}
            <div className="page-shell section-gap">
                <div className="mb-8 md:mb-12 rounded-2xl md:rounded-3xl border border-[var(--color-primary-light)]/55 bg-white/70 px-5 md:px-7 py-5 md:py-6">
                    {loading ? (
                        <Skeleton height={50} width={400} containerClassName='flex-1'/>
                    ) : (
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold heading-gradient mb-2">
                                {category} Collection
                            </h1>
                            <p className="text-[var(--color-text-secondary)]">
                                Showing {products.length} products
                            </p>
                        </div>
                    )}
                </div>

                {/* Products Grid */}
                <div className="product-grid pb-4">
                    {loading? 
                        Array(8).fill().map((_, i) => (
                        <Skeleton key={i} height={250} />
                        ))
                        : products.length > 0 ? products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    )) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-[var(--color-text-secondary)] text-lg">
                                No products found in this category
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default CategoryProducts;