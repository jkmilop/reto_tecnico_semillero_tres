const Facultad = require('./models/facultad.js')
const Alumno = require('./models/alumno.js');
const Curso = require('./models/curso.js');
const Profesor = require('./models/profesor.js');
const CursosAlumno = require('./models/cursosalumno.js');
const CursosProfesor = require('./models/cursosprofesor.js');

Alumno.belongsTo(Facultad, { foreignKey: 'nombre_facultad', targetKey: 'nombre' });
Curso.belongsToMany(Alumno, { through: CursosAlumno, foreignKey: 'nombre_curso', targetKey: 'nombre' });
Alumno.belongsToMany(Curso, { through: CursosAlumno, foreignKey: 'nombre_alumno', targetKey: 'nombre' });
Profesor.belongsToMany(Curso, { through: CursosProfesor, foreignKey: 'nombre_profesor', targetKey: 'nombre' });
Curso.belongsToMany(Profesor, { through: CursosProfesor, foreignKey: 'nombre_curso', targetKey: 'nombre' });
CursosAlumno.belongsTo(Curso, { foreignKey: 'nombre_curso', targetKey: 'nombre' });
CursosAlumno.belongsTo(Alumno, { foreignKey: 'nombre_alumno', targetKey: 'nombre' });
CursosProfesor.belongsTo(Curso, { foreignKey: 'nombre_curso', targetKey: 'nombre' });
CursosProfesor.belongsTo(Profesor, { foreignKey: 'nombre_profesor', targetKey: 'nombre' });

module.exports = { Curso, Alumno, Facultad, Profesor, CursosAlumno, CursosProfesor };
