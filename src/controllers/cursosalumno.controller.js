const CursosAlumno = require('../models/cursosalumno.js');
const Curso = require('../models/curso.js');
const Alumno = require('../models/alumno.js');

function handleError(res, error) {
  console.error('Error:', error);
  return res.status(500).json({ message: error.message });
}

async function agregarCursosAlumno(req, res) {
  const { descripcion, idCurso, idAlumno } = req.body;
  try {
    const nuevoCursosAlumno = await CursosAlumno.create({
      descripcion,
      idCurso,
      idAlumno,
    });

    const curso = await Curso.findByPk(idCurso);
    const alumno = await Alumno.findByPk(idAlumno);

    if (curso && alumno) {
      await nuevoCursosAlumno.setCurso(curso);
      await nuevoCursosAlumno.setAlumno(alumno);
    } else {
      throw new Error('Curso o Alumno no encontrado');
    }

    res.json(nuevoCursosAlumno);
  } catch (error) {
    handleError(res, error);
  }
}

async function obtenerCursosAlumno(req, res) {
  try {
    const cursosAlumno = await CursosAlumno.findAll({
      include: [Curso, Alumno],
    });
    res.json(cursosAlumno);
  } catch (error) {
    handleError(res, error);
  }
}
async function obtenerCursosAlumnoPorId(req, res) {
  const { id } = req.params;
  try {
    const cursosAlumno = await CursosAlumno.findByPk(id, {
      include: [Curso, Alumno],
    });
    if (!cursosAlumno) {
      return res.status(404).json({ message: 'CursosAlumno no encontrado' });
    }
    res.json(cursosAlumno);
  } catch (error) {
    handleError(res, error);
  }
}

async function actualizarCursosAlumno(req, res) {
  const { id } = req.params;
  try {
    const cursosAlumno = await CursosAlumno.findByPk(id);
    if (!cursosAlumno) {
      return res.status(404).json({ message: 'CursosAlumno no encontrado' });
    }

    await cursosAlumno.update(req.body);

    res.json(cursosAlumno);
  } catch (error) {
    handleError(res, error);
  }
}

async function eliminarCursosAlumno(req, res) {
  const { id } = req.params;
  try {
    const cursosAlumno = await CursosAlumno.findByPk(id);
    if (!cursosAlumno) {
      return res.status(404).json({ message: 'CursosAlumno no encontrado' });
    }

    await cursosAlumno.destroy();

    return res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  agregarCursosAlumno,
  obtenerCursosAlumno,
  obtenerCursosAlumnoPorId,
  actualizarCursosAlumno,
  eliminarCursosAlumno,
};
