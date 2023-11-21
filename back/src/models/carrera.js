'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

const Carrera = sequelize.define(
  'Carrera',
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
    descripcion: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: 'Carrera',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Carrera;
