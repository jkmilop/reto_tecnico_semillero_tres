const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  "reto_tres",
  "cwng",
  "cwng",
  {
    host: "localhost",
    dialect: "postgres",
    logging: console.log,
  }
);

module.exports = sequelize;
