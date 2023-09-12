module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Alumno', {
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
      identificacion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      telefono: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      semestre: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      idFacultad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Alumno');
  }
};
