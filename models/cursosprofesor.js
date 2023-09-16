'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js'); // Asegúrate de que la importación del objeto sequelize sea correcta
const Profesor = require('./profesor.js')
const Curso = require('./curso.js')

const CursosProfesor = sequelize.define(
  "CursosProfesor",
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
    id_profesor: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Profesor',
        key: 'id',
      },
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
CursosProfesor.hasOne(Profesor, {
  foreinkey: "id_profesor",
  sourceKey: "id",
});
Profesor.belongsTo(CursosProfesor, { foreignKey: "id_profesor", targetId: "id" });
Profesor.hasMany(Curso, { foreignKey: "id_curso", targetId: "id" }); // A HasMany B
Curso.belongsToMany(Profesor, { foreignKey: "id_curso", targetId: "id" });
module.exports = CursosProfesor;
