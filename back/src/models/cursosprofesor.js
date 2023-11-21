'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');
const Profesor = require('./profesor.js');
const Curso = require('./curso.js');

const CursosProfesor = sequelize.define(
  "CursosProfesor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: DataTypes.TEXT,
    nombre_curso: {
      type: DataTypes.STRING,
      references: { model: 'Curso', key: 'nombre' },
      allowNull: false,
    },
    nombre_profesor: {
      type: DataTypes.STRING,
      references: { model: 'Profesor', key: 'nombre' },
      allowNull: false,
    },    
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

  },
  {
    sequelize,
    modelName: 'CursosProfesor',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = CursosProfesor;
