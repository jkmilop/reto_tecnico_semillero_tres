'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

const Facultad = sequelize.define(
  'Facultad',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Facultad',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Facultad;
