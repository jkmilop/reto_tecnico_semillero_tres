'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Alumno extends Model {
    static associate(models) {
      // Define las asociaciones aquí si es necesario
    }
  }

  Alumno.init(
    {
      nombre: DataTypes.STRING,
      identificacion: DataTypes.INTEGER,
      telefono: DataTypes.INTEGER,
      semestre: DataTypes.INTEGER,
      idFacultad: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Alumno',
      timestamps: false, 
    }
  );

  return Alumno;
};
