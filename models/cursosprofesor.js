'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CursosProfesor extends Model {
    static associate(models) {
      models.CursosProfesor.belongsTo(models.Curso, { foreignKey: 'id_curso' });
      models.CursosProfesor.belongsTo(models.Profesor, { foreignKey: 'id_profesor' });
    }
  }

  CursosProfesor.init(
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
      id_profesor: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Profesor', // Asegúrate de que coincida con el nombre del modelo de Profesor
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CursosProfesor',
      timestamps: false, 
    }
  );

  return CursosProfesor;
};
