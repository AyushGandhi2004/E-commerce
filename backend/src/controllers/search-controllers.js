const Product = require("../modules/Product");

const fetchSearchedProducts = async (req,res)=>{
    try {
        const input = req.params.input;
        const products = await Product.find({$or : [
            {name : {$regex : input , $options : "i"}},
            {category : {$regex : input , $options : "i"}},
            {tags : {$regex : input , $options : "i"}}
        ]});
        if(products) return res.status(200).json({
            message : "Products fetched",
            products
        }) 
        else return res.status(404).json({
            message : "No such Product found"
        })
    } catch (error) {
        console.log("Error in fetching searched Products : ",error);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
};

module.exports = {fetchSearchedProducts};