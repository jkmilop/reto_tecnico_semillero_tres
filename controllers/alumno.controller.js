const Alumno = require('../models/alumno.js');
const Facultad = require('../models/facultad.js');

function handleError(res, error) {
  console.error('Error:', error);
  return res.status(500).json({ message: error.message });
}

async function agregarAlumno(req, res) {
  try {
    const nuevoAlumno = await Alumno.create(req.body);
    const facultad = await Facultad.findByPk(req.body.idFacultad);
    if (facultad) {
      await nuevoAlumno.setFacultad(facultad);
    }

    res.json(nuevoAlumno);
  } catch (error) {
    handleError(res, error);
  }
  return res.status(400).json({ message: 'Teléfono inválido' });
}

async function obtenerAlumnos(req, res) {
  try {
    const alumnos = await Alumno.findAll();
    res.json(alumnos);
  } catch (error) {
    handleError(res, error);
  }
}

async function actualizarAlumno(req, res) {
  const { id } = req.params;
  try {
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    await alumno.update(req.body);

    res.json(alumno);
  } catch (error) {
    handleError(res, error);
  }
}

async function eliminarAlumno(req, res) {
  const { id } = req.params;
  try {
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    await alumno.destroy();

    return res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
}

async function obtenerAlumno(req, res) {
  const { id } = req.params;
  try {
    const alumno = await Alumno.findByPk(id, {
      attributes: ['nombre', 'identificacion', 'telefono', 'semestre', 'idFacultad'],
    });
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    res.json(alumno);
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  agregarAlumno,
  obtenerAlumnos,
  actualizarAlumno,
  eliminarAlumno,
  obtenerAlumno,
};
