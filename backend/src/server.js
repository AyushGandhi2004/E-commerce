const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectToDatabase = require('./database/db');
const e = require('express');
const cookieParser = require("cookie-parser");


// Importing routes
const authRoutes = require('./routes/auth-routes');
const productRoutes = require('./routes/product-routes');
const cartRoutes = require('./routes/cart-routes');
const wishlistRoutes = require('./routes/wishlist-routes');

const app = express();
connectToDatabase();
//using cookies:
app.use(cookieParser());

//Using middlewares:
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true               // allow cookies
}));
//routing API calls:
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
