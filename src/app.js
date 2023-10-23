const express = require('express');
const cors = require('cors');
const alumnoRoutes = require('./routes/alumno.routes.js');
const cursoRoutes = require('./routes/curso.routes.js');
const cursosAlumnoRoutes = require('./routes/cursosalumno.routes.js');
const cursosProfesorRoutes = require('./routes/cursosprofesor.routes.js');
const facultadRoutes = require('./routes/facultad.routes.js');
const profesorRoutes = require('./routes/profesor.routes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/reto-tres/alumnos', alumnoRoutes);
app.use('/reto-tres/cursos', cursoRoutes);
app.use('/reto-tres/cursos-alumno', cursosAlumnoRoutes);
app.use('/reto-tres/cursos-profesor', cursosProfesorRoutes);
app.use('/reto-tres/facultades', facultadRoutes);
app.use('/reto-tres/profesores', profesorRoutes);

module.exports = app;
