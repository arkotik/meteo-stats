'use strict';

const Sequelize = require('sequelize');
const { dbConfig } = require('../../project.config');
const fs = require('fs');
const path = require('path');

const { database, username, password, ...rest } = dbConfig;
const sequelize = new Sequelize(database, username, password, {
  ...rest,
  pool: {
    max: 100,
    idle: 28.8e6,
  },
});
const basename = path.basename(__filename);

/**
 *
 * @type {Object} models
 * @prop {Object} User
 * @prop {object} Data
 * @prop {object} Device
 * @prop {object} UserDevice
 */
const models = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
