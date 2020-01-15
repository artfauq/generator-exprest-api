const { Sequelize } = require('sequelize');

const { env } = require('./index');
const db = require('./database')[env];

// Sequelize instance configuration
const sequelize = new Sequelize(db);

module.exports = sequelize;
