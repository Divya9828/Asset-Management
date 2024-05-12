// models/asset.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AssetHistory = sequelize.define('AssetHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reason:{
    type:DataTypes.STRING
  },
  action:{
    type:DataTypes.STRING,
    defaultValue:'not return'
  }
  // Add more fields as needed
});

module.exports = AssetHistory;
