'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CursosAlumno extends Model {
    static associate(models) {
      models.CursosAlumno.belongsTo(models.Curso, { foreignKey: 'id_curso' });
      models.CursosAlumno.belongsTo(models.Alumno, { foreignKey: 'id_alumno' });
    }
  }

  CursosAlumno.init(
    {
      descripcion: DataTypes.TEXT,
      id_curso: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Curso', // Asegúrate de que coincida con el nombre del modelo de Curso
          key: 'id',
        },
        allowNull: false,
      },
      id_alumno: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Alumno', // Asegúrate de que coincida con el nombre del modelo de Alumno
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CursosAlumno',
      timestamps: false, 
    }
  );

  return CursosAlumno;
};
