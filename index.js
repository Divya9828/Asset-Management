// index.js
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')

// local module
const employeeRoutes = require('./routes/employeeRoutes');
const assetRoutes = require('./routes/assetRoutes');
const assetCategory = require('./routes/assetCategoryRoute');
const assetHistory = require('./routes/assetHistory');


const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// Define routes
app.use('/employees', employeeRoutes);
app.use('/assets', assetRoutes);
app.use('/assetcategory', assetCategory);
app.use('/assethistory', assetHistory);


// Sync database and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
