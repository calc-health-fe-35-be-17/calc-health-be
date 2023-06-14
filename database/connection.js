const { Sequelize } = require('sequelize');
const config = require('../config/config'); // Path to your configuration file

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    // Additional configuration options
  }
);

module.exports = sequelize;
