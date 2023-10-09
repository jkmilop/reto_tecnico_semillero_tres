const CursosProfesor = require('../models/cursosprofesor.js');
const Curso = require('../models/curso.js');
const Profesor = require('../models/profesor.js');

// Manejador de errores genérico
function handleError(res, error) {
  console.error('Error:', error);
  return res.status(500).json({ message: error.message });
}

async function agregarCursosProfesor(req, res) {
  const { descripcion, idCurso, idProfesor } = req.body;
  try {
    const nuevoCursosProfesor = await CursosProfesor.create({
      descripcion,
      idCurso,
      idProfesor,
    });

    const curso = await Curso.findByPk(idCurso);
    const profesor = await Profesor.findByPk(idProfesor);

    if (curso && profesor) {
      await nuevoCursosProfesor.setCurso(curso);
      await nuevoCursosProfesor.setProfesor(profesor);
    } else {
      throw new Error('Curso o Profesor no encontrado');
    }

    res.json(nuevoCursosProfesor);
  } catch (error) {
    handleError(res, error);
  }
}

async function obtenerCursosProfesor(req, res) {
  try {
    const cursosProfesor = await CursosProfesor.findAll({
      include: [Curso, Profesor],
    });
    res.json(cursosProfesor);
  } catch (error) {
    handleError(res, error);
  }
}

async function obtenerCursosProfesorPorId(req, res) {
  const { id } = req.params;
  try {
    const cursosProfesor = await CursosProfesor.findByPk(id, {
      include: [Curso, Profesor],
    });
    if (!cursosProfesor) {
      return res.status(404).json({ message: 'CursosProfesor no encontrado' });
    }
    res.json(cursosProfesor);
  } catch (error) {
    handleError(res, error);
  }
}

async function actualizarCursosProfesor(req, res) {
  const { id } = req.params;
  try {
    const cursosProfesor = await CursosProfesor.findByPk(id);
    if (!cursosProfesor) {
      return res.status(404).json({ message: 'CursosProfesor no encontrado' });
    }
    await cursosProfesor.update(req.body);
    res.json(cursosProfesor);
  } catch (error) {
    handleError(res, error);
  }
}

async function eliminarCursosProfesor(req, res) {
  const { id } = req.params;
  try {
    const cursosProfesor = await CursosProfesor.findByPk(id);
    if (!cursosProfesor) {
      return res.status(404).json({ message: 'CursosProfesor no encontrado' });
    }
    await cursosProfesor.destroy();
    return res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  agregarCursosProfesor,
  obtenerCursosProfesor,
  obtenerCursosProfesorPorId,
  actualizarCursosProfesor,
  eliminarCursosProfesor,
};
