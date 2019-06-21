const { readdirSync } = require('fs');
const { join, basename } = require('path');
const Sequelize = require('sequelize');

const options = require('../config/sequelize');

// Sequelize instance configuration
const sequelize = new Sequelize(options);

const db = {};

readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename(__filename) && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
