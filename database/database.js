const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  "reto_tres",
  "cwng",
  "cwng",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});
module.exports = sequelize;
