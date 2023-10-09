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
    descripcion: DataTypes.TEXT,
    fecha_inauguracion: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Facultad',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Facultad;
