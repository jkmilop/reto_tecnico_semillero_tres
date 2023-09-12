const express = require('express');
const cors = require('cors');
const alumnoRoutes = require('../routes/alumno.routes.js');
const profesorRoutes = require('../routes/profesor.routes.js');
const cursoRoutes = require('../routes/curso.routes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/reto-tres/alumnos', alumnoRoutes);
app.use('/reto-tres/profesores', profesorRoutes);
app.use('/reto-tres/cursos', cursoRoutes);

module.exports = app;
