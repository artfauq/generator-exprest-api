const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

// Import models
const models = {};

// Associate models
Object.keys(models).forEach(model => {
  if (models[model].associate && typeof models[model].associate === 'function') {
    models[model].associate(models);
  }
});

module.exports = { ...models, sequelize, Sequelize };
