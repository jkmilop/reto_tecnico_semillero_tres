'use strict';
const app = require('./app.js');
const { Curso, Carrera, Alumno, Facultad, Profesor, CursosAlumno, CursosProfesor }= require('./associations.js');
const sequelize = require('./database/database.js');

async function main() {
  try {
    await sequelize.sync({force: true });
    app.listen(3000);
    console.log('Server is running on port 3000');
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}
main();

