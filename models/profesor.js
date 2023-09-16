'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js'); // Asegúrate de que la importación del objeto sequelize sea correcta
const Profesor = sequelize.define(
  "Profesor",
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
    identificacion: DataTypes.INTEGER,
    telefono: DataTypes.INTEGER,
    idRol: DataTypes.INTEGER,
    tituloAcademico: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Profesor',
    timestamps: false,
    freezeTableName: true,

  }
);

module.exports = Profesor;
