const mongoose = require('mongoose');
const Product = require('../modules/Product');

const insertProducts = async (req,res) => {
    try {
        const products = await Product.insertMany(req.body);
        res.status(201).json({ message: "Products added successfully", product: products });
    } catch (error) {
        console.log(error, "Error in inserting products");
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        if(products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({ message: "Products retrieved successfully", products }); 
    } catch (error) {
        console.log(error, "Error in getAllProducts");
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const reqProduct = await Product.findById(productId);
        if (!reqProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product retrieved successfully", product: reqProduct });
    } catch (error) {
        console.log(error, "Error in getProductById");
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteProductById = async (req,res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
        console.log(error, "Error in deleteProductById");
        res.status(500).json({ message: "Internal Server Error" });        
    }
}

const getProductsByCategory = async (req,res) =>{
    try {
        const category = req.params.category.toLowerCase();
        const ProductsByCategory = await Product.find({ category: category });
        if (ProductsByCategory.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }
        res.status(200).json({ message: "Products retrieved successfully", products: ProductsByCategory });
    } catch (error) {
        console.log(error, "Error in getProductsByCategory");
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { insertProducts, getAllProducts, getProductById, deleteProductById, getProductsByCategory };