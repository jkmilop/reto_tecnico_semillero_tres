'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CursosAlumno', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      id_curso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Curso',
          key: 'id'
        }
      },
      id_alumno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Alumno',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CursosAlumno');
  }
};
