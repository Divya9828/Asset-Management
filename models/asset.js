// models/asset.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Asset = sequelize.define('Asset', {
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Add more fields as needed
});

module.exports = Asset;
