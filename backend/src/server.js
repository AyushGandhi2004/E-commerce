const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectToDatabase = require('./database/db');
const e = require('express');

// Importing routes
const authRoutes = require('./routes/auth-routes');
const productRoutes = require('./routes/product-routes');
const cartRoutes = require('./routes/cart-routes');

const app = express();
connectToDatabase();

//Using middlewares:
app.use(express.json());

app.use(cors());
//routing API calls:
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
