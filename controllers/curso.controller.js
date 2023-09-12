const Curso = require('../models/curso.js');

// Manejador de errores genérico
function handleError(res, error) {
  console.error('Error:', error);
  return res.status(500).json({ message: error.message });
}

async function agregarCurso(req, res) {
  const { nombre, prerrequisito, activo, creditos, cupos } = req.body;
  try {
    const nuevoCurso = await Curso.create({
      nombre,
      prerrequisito,
      activo,
      creditos,
      cupos,
    });
    res.json(nuevoCurso);
  } catch (error) {
    handleError(res, error);
  }
}

async function obtenerCursos(req, res) {
  try {
    const cursos = await Curso.findAll();
    res.json(cursos);
  } catch (error) {
    handleError(res, error);
  }
}

async function actualizarCurso(req, res) {
  const { id } = req.params;
  try {
    const curso = await Curso.findByPk(id);
    if (!curso) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    await curso.update(req.body);

    res.json(curso);
  } catch (error) {
    handleError(res, error);
  }
}

async function eliminarCurso(req, res) {
  const { id } = req.params;
  try {
    const curso = await Curso.findByPk(id);
    if (!curso) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    await curso.destroy();

    return res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
}

async function obtenerCurso(req, res) {
  const { id } = req.params;
  try {
    const curso = await Curso.findByPk(id);
    if (!curso) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.json(curso);
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  agregarCurso,
  obtenerCursos,
  actualizarCurso,
  eliminarCurso,
  obtenerCurso,
};
