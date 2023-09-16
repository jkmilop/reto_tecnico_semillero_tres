'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js'); // Asegúrate de que la importación del objeto sequelize sea correcta
const Alumno = require('./alumno.js')
const Curso = require('./curso.js')

const CursosAlumno = sequelize.define(
  "CursosAlumno",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: DataTypes.TEXT,
    id_curso: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Curso',
        key: 'id',
      },
      allowNull: false,
    },
    id_alumno: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Alumno',
        key: 'id',
      },
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
CursosAlumno.hasOne(Alumno, {
  foreinkey: "id_alumno",
  sourceKey: "id",
});
Alumno.belongsTo(CursosAlumno, { foreignKey: "id_alumno", targetId: "id" });
Alumno.hasMany(Curso, { foreignKey: "id_curso", targetId: "id" }); // A HasMany B
Curso.belongsToMany(Alumno, { foreignKey: "id_curso", targetId: "id" });
module.exports = CursosAlumno;
