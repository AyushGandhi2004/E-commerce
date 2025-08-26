const mongoose = require('mongoose');
const User = require('../modules/User');
const Product = require('../modules/Product');
const Cart = require('../modules/Cart');

//Add item to cart:
const addToCart = async (req,res)=>{
    try {
        const user = req.userInfo;
        const { productId, quantity } = req.body;
        //Check if user exists:
        const checkUser = await User.findById(user.userId);
        if(!checkUser){
            return res.status(404).json({message: "User not found"});
        }
        //Check if product exists:
        const checkProduct = await Product.findById(productId);
        if(!checkProduct){
            return res.status(404).json({message: "Product not found"});
        }
        //Check if user has a cart for the user id in the cart collection:
        const userCart = await Cart.findOne({userId : checkUser._id});
        if(userCart){
            //If product already exits in cart,then update qnty:
            const productIndex = userCart.items.findIndex((p)=> p.productId==productId);
            if(productIndex > -1){
                let productItem = userCart.items[productIndex];
                productItem.quantity += quantity;
                userCart.items[productIndex] = productItem;
            }else{
                userCart.items.push({productId, quantity});
            }
            userCart.save();
        }else{
            //Create a cart and then add product:
            const newCart = await Cart.create({
                userId : checkUser._id,
                items : [{productId, quantity}]
            });
            return res.status(201).json({message: "New cart created and product added to cart", cart: newCart});
        }
    } catch (error) {
        console.log(`Error in adding product to cart : ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }
};

//remove item from cart:
const removeFromCart = async (req,res)=>{
    try {
        const user = req.userInfo;
        const { productId } = req.body;
        //Check if user exists:
        const checkUser = await User.findById(user.userId);
        if(!checkUser){
            return res.status(404).json({message: "User not found"});
        }
        //Check if product exists:
        const checkProduct = await Product.findById(productId);
        if(!checkProduct){
            return res.status(404).json({message: "Product not found"});
        }
        //Check if user has a cart for the user id in the cart collection:
        const userCart = await Cart.findOne({UserId : checkUser._id});
        if(userCart){
            const productIndex = userCart.items.findIndex((p)=> p.productId==productId);
            if(productIndex > -1){
                userCart.items.splice(productIndex,1);
                await userCart.save();
                return res.status(200).json({message: "Product removed from cart", cart: userCart});
            }else{
                return res.status(404).json({message: "Product not found in cart"});
            }
        }else{
            return res.status(404).json({message: "Cart is empty"});
        }
    } catch (error) {
        console.log(`Error in removing product from cart : ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const getCartItems = async (req,res)=>{
    try {
        const user = req.userInfo;
        //Check if user exists:
        const checkUser = await User.findById(user.userId);
        if(!checkUser){
            return res.status(404).json({message: "User not found"});
        }
        //Check if user has a cart for the user id in the cart collection:
        const userCart = await Cart.findOne({userId : checkUser._id}).populate('items.productId');
        if(!userCart || userCart.items.length === 0){
            return res.status(404).json({message: "Cart is empty"});
        }
        return res.status(200).json({cart: userCart});
    } catch (error) {
        console.log(`Error in getting cart items : ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {addToCart , removeFromCart , getCartItems};