'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CursosProfesor', {
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
      id_profesor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Profesor',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CursosProfesor');
  }
};
