'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');
const Curso = require('./curso.js');
const Alumno = require('./alumno.js');

const CursosAlumno = sequelize.define(
  "CursosAlumno",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: DataTypes.TEXT,
    nombre_curso: {
      type: DataTypes.STRING,
      references: { model: 'Curso', key: 'id' },
      allowNull: false,
    },
    nombre_alumno: {
      type: DataTypes.STRING,
      references: { model: 'Alumno', key: 'id' },
      allowNull: false,
    },
    creditos_inscritos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },


  },
  {
    sequelize,
    modelName: 'CursosAlumno',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = CursosAlumno;
