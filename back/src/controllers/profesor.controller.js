const Profesor = require('../models/profesor.js');

function handleError(res, error) {
  console.error('Error:', error);
  return res.status(500).json({ message: error.message });
}

async function agregarProfesor(req, res) {
  const { nombre, identificacion, telefono, tituloAcademico, fechaInicio } = req.body;
  try {
    const nuevoProfesor = await Profesor.create({
      nombre,
      identificacion,
      telefono,
      tituloAcademico,
      fechaInicio,
    });
    res.json(nuevoProfesor);
  } catch (error) {
    handleError(res, error);
  }
}

async function obtenerProfesores(req, res) {
  try {
    const profesores = await Profesor.findAll();
    res.json(profesores);
  } catch (error) {
    handleError(res, error);
  }
}

async function actualizarProfesor(req, res) {
  const { id } = req.params;
  try {
    const profesor = await Profesor.findByPk(id);
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }

    await profesor.update(req.body);

    res.json(profesor);
  } catch (error) {
    handleError(res, error);
  }
}

async function eliminarProfesor(req, res) {
  const { id } = req.params;
  try {
    const profesor = await Profesor.findByPk(id);
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }

    await profesor.destroy();

    return res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
}

async function obtenerProfesor(req, res) {
  const { id } = req.params;
  try {
    const profesor = await Profesor.findByPk(id);
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }

    res.json(profesor);
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  agregarProfesor,
  obtenerProfesores,
  actualizarProfesor,
  eliminarProfesor,
  obtenerProfesor,
};
