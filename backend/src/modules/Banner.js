const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    imageId : {
        type : String,
        required: true
    },
    id : {
        type : Number,
        required: true,
        unique: [true, 'Banner ID must be unique']
    }
});

module.exports = mongoose.model('Banner', bannerSchema);