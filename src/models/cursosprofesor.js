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

//CursosProfesor.hasOne(Profesor, { sourceKey: 'id' , foreignKey: 'id_profesor' }); // A Curso has many CursosProfesor
//CursosProfesor.hasMany(Curso, { sourceKey: 'id',foreignKey: 'id_curso' }); // A Profesor has many CursosProfesor
//Curso.belongsTo(CursosProfesor); // A Curso belongs to many Alumnos through CursosAlumno
//Profesor.belongsToMany(Curso, { through: CursosProfesor ,  foreignKey: 'id_curso',}); // An Alumno belongs to many Cursos through CursosAlumno
//CursosProfesor.belongsTo(Profesor, { targetKey: 'id',foreignKey: 'id_curso' });
//Curso.belongsToMany(Profesor, {through: CursosProfesor,foreignKey: 'id_curso',as: 'Profesores',}); // Alias for the association

module.exports = CursosProfesor;
