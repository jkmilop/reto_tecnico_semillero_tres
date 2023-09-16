'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js'); // Asegúrate de que la importación del objeto sequelize sea correcta
const Facultad = sequelize.define(
  "Facultad",
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
    },
    descripcion: DataTypes.TEXT,
    fechaInauguracion: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Facultad',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Facultad;
