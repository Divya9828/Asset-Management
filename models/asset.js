// models/asset.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Asset = sequelize.define('Asset', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available'
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: true // Nullable because asset may not be issued to any employee initially
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  // Add more fields as needed
});

module.exports = Asset;
