const express = require('express');
const User = require('../modules/User');
const Product = require('../modules/Product');
const Wishlist = require('../modules/Wishlist');

const addToWishlist = async (req,res)=>{
    try {
        const user = req.userInfo;
        const {productId} = req.body;
        const checkUser = await User.findById(user.userId);
        if(!checkUser){
            return (
                res.status(404).json({
                    message : "User not found"
                })
            )
        }
        const checkProduct = await Product.findById(productId);
        if(!checkProduct){
            return res.status(404).json({
                message : "Product not found"
            })
        }
        const userWishlist = await Wishlist.findOne({userId : checkUser._id});
        if(!userWishlist) {
            const newWishlist = await Wishlist.create({
                userId : checkUser._id,
                products : [checkProduct._id]
            })
            res.status(201).json({
                message : "Wishlist created and product added"
            })
        }else{
            userWishlist.products.push(checkProduct._id);
            await userWishlist.save();
            return res.status(201).json({
                message : "Product added"
            })
        }
    } catch (error) {
        console.log(`Error in adding to wishlist : ${error}`);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

const removeFromWishlist = async (req,res)=>{
    try {
        const user = req.userInfo;
        const {productId} = req.body;
        const checkUser = await User.findById(user.userId);
        if(!checkUser) return res.status(404).json({
            message : "User not found"
        })
        const checkProduct = await Product.findById(productId);
        if(!checkProduct){
            return res.status(404).json({message: "Product not found"});
        }
        const userWishlist = await Wishlist.findOne({userId : checkUser._id});
        if(!userWishlist) return res.status(404).json({
            message : "Wishlist is empty"
        })
        const index = userWishlist.products.findIndex((p)=>p==productId);
        if(index>-1){
            userWishlist.products.splice(index,1);
            await userWishlist.save();
            return res.status(200).json({message: "Product removed from wishlist", cart: userWishlist});
        }else{
            return res.status(403).json({message: "Product not found in wishlist"});
        }
    } catch (error) {
        console.log(`Error in removing product from wishlist : ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }
    
}

const getWishlistItems = async (req,res)=>{
    try {
        const user = req.userInfo;
        const checkUser = await User.findById(user.userId);
        if(!checkUser) return res.status(404).json({
            message : "User not found"
        })
        const userWishlist = await Wishlist.findOne({userId : checkUser._id}).populate('products');
        if(!userWishlist || userWishlist.products.length == 0) return res.status(404).json({
            message : "Your Wishlist is empty"
        });
        return res.status(200).json({
            message : "Wishlist loaded",
            wishlist : userWishlist
        })
    } catch (error) {
        console.log(`Error in getting wishlist items : ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }
    
}

const checkWishlist = async (req,res)=>{
    try {
        const user = req.userInfo.userId;
        const productId = req.params.id;

        const checkUser = await User.findById(user);
        if(!checkUser) return res.status(404).json({
            message : "No user found",
        })
        const checkWishlist = await Wishlist.findOne({userId : user});
        if(!checkWishlist) return res.status(404).json({
            message : "Wishlist is empty"
        })
        const itemInd = checkWishlist.products.findIndex((p)=>p==productId);
        if(itemInd>-1) return res.status(200).json({
            message : "Product is in wishlist"
        })
        else return res.status(404).json({
            message : "Product not in wishlist"
        })
    } catch (error) {
        console.log(`Error in finding the status of wishlist of product for the user : ${error}`);
        res.status(500).json({
            message : "Internal server error"
        })
    }
    
}

module.exports = {addToWishlist,removeFromWishlist,getWishlistItems,checkWishlist};