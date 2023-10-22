const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  "reto_tres",
  "",
  "",
  {
    host: "localhost",
    dialect: "postgres",
    logging: console.log,
  }
);

module.exports = sequelize;
