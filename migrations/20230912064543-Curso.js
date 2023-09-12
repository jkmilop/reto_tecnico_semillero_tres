module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Curso', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prerrequisito: {
        type: Sequelize.STRING,
        allowNull: false
      },
      activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      creditos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cupos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Curso');
  }
};
