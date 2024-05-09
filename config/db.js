// config/db.js
const { Sequelize } = require('sequelize');
const config = require('./config');

// Load database configuration based on environment
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize with the loaded configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  // Other options if needed
});

module.exports = sequelize;
