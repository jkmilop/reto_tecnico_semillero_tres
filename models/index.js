'use strict';

const app = require('./app');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const PORT = 4000;
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

async function main() {
  try {
    await sequelize.sync({ alter: true });
    app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}
main();
module.exports = { db, sequelize };

