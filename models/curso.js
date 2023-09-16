'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js'); // Asegúrate de que la importación del objeto sequelize sea correcta
const Curso = sequelize.define(
  "Curso",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    prerrequisito: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    creditos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cupos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // Asegúrate de que estés utilizando el objeto sequelize correcto
    modelName: 'Curso',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Curso;
