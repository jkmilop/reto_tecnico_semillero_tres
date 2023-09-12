'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Profesor extends Model {
    static associate(models) {
      // Define las asociaciones aquí si es necesario
    }
  }

  Profesor.init(
    {
      nombre: DataTypes.STRING,
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
    }
  );

  return Profesor;
};
