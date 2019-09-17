const Sequelize = require('sequelize');

const sequelize = require('../config/sequelize');
// const User = require('./user');

// Import models
const models = {
  // User,
};

// Associate models
Object.keys(models).forEach(model => {
  if (models[model].associate && typeof models[model].associate === 'function') {
    models[model].associate(models);
  }
});

module.exports = { ...models, Sequelize, sequelize };
