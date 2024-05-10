// models/asset.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AssetCategory = sequelize.define('AssetCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
   // Add more fields as needed
});

module.exports = AssetCategory;
