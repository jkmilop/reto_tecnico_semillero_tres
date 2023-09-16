'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js'); // Asegúrate de que la importación del objeto sequelize sea correcta
const Facultad = require('./facultad.js')
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
    },
    identificacion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    semestre: DataTypes.INTEGER,
    id_facultad: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Facultad',
        key: 'id',
      },
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

Alumno.hasOne(Facultad, {
  foreinkey: "id_facultad",
  sourceKey: "id",
});
Facultad.belongsTo(Alumno, { foreignKey: "id_facultad", targetId: "id" });

module.exports = Alumno;
