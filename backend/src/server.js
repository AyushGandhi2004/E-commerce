const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectToDatabase = require('./database/db');
const e = require('express');

const app = express();
connectToDatabase();

//Using middlewares:
app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
