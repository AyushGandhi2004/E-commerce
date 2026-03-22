const express = require('express');
const upload = require('../middlewares/multer-middleware');
const { uploadOnCloudinary } = require('../config/cloudinary');

const router = express.Router();

router.post('/banner', upload.single('bannerImage') , async (req,res)=>{
    const pathForCloudinary = "./public/temp/"+req.localStoragePath;
    const cloudinaryResponse = await uploadOnCloudinary(pathForCloudinary);
    if(cloudinaryResponse) return res.status(201).json({
        message : "File stored in local storage",
        cloudinaryResponse
    });
} );

module.exports = router;