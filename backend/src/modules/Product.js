const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        index : true
    },
    price : {
        type: Number,
        required: true,
        index : true
    },
    category : {
        type: String,
        required: true,
        index : true
    },
    imageUrl : {
        type: String,
        required: true
    },
    inStock : {
        type: Boolean,
        default: true ,
        index : true
    },
    description : {
        type : String,
        default : ""
    },
    slug : {
        type: String,
        required: true,
        index : true
    },
    tags : [{
        type : String,
        index : true
    }],
    rating : {
        type : Number,
        default : 0,
        index : true
    }
    
},{timestamps: true});

ProductSchema.index(
    {
        name : "text",
        description : "text",
        category : "text",
        tags : "text"
    },
    {
        weights : {name : 5, category : 3 , tags : 4, description : 1},
        name : "ProductTextIndex",
        default_language : "english"
    }
);

module.exports = mongoose.model('Product', ProductSchema);