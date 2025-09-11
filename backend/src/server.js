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
const searchRoutes = require('./routes/search-routes');

const app = express();
connectToDatabase();
//using cookies:
app.use(cookieParser());

//Using middlewares:
app.use(express.json());

//const cors = require("cors");
const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://e-commerce-frontend-sloj.onrender.com" // deployed frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like curl, postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies to be sent
}));

//routing API calls:
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/search',searchRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
