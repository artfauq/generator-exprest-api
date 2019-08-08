const { readdirSync } = require('fs');
const { join, basename } = require('path');
const Sequelize = require('sequelize');

const sequelize = require('../config/sequelize');

const db = {};

// Import models
readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename(__filename) && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(join(__dirname, file));
    db[model.name] = model;
  });

// Associate models
Object.keys(db).forEach(model => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
