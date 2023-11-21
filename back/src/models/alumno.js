'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js'); // Asegúrate de que la importación del objeto sequelize sea correcta
const Alumno = sequelize.define(
  "Alumno",
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
    identificacion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    semestre: DataTypes.INTEGER,
    nombre_facultad: {
      type: DataTypes.STRING,
      references: { model: 'Facultad', key: 'nombre' },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Alumno',
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = Alumno;
