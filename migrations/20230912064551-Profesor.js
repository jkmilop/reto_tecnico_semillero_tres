   module.exports = {
     up: async (queryInterface, Sequelize) => {
       await queryInterface.createTable('Profesor', {
         id: {
           type: Sequelize.INTEGER,
           allowNull: false,
           autoIncrement: true,
           primaryKey: true
         },
         nombre: {
           type: Sequelize.STRING,
           allowNull: true
         },
         identificacion: {
           type: Sequelize.INTEGER,
           allowNull: true
         },
         telefono: {
           type: Sequelize.INTEGER,
           allowNull: true
         },
         idRol: {
           type: Sequelize.INTEGER,
           allowNull: true
         },
         tituloAcademico: {
           type: Sequelize.STRING,
           allowNull: true
         },
         fechaInicio: {
           type: Sequelize.DATE,
           allowNull: true
         },
       });
     },
     down: async (queryInterface, Sequelize) => {
       await queryInterface.dropTable('Profesor');
     }
   };
