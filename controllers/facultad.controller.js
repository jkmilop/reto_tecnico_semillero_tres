const Facultad = require('../models/facultad.js');

function handleError(res, error) {
  console.error('Error:', error);
  return res.status(500).json({ message: error.message });
}

async function agregarFacultad(req, res) {
  const { nombre, descripcion, fechaInauguracion } = req.body;
  try {
    if (!nombre || !descripcion || !fechaInauguracion) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const nuevaFacultad = await Facultad.create({
      nombre,
      descripcion,
      fechaInauguracion,
    });

    res.json(nuevaFacultad);
  } catch (error) {
    handleError(res, error);
  }
}

async function obtenerFacultades(req, res) {
  try {
    const facultades = await Facultad.findAll();
    res.json(facultades);
  } catch (error) {
    handleError(res, error);
  }
}

async function actualizarFacultad(req, res) {
  const { id } = req.params;
  try {
    const facultad = await Facultad.findByPk(id);
    if (!facultad) {
      return res.status(404).json({ message: 'Facultad no encontrada' });
    }

    await facultad.update(req.body);

    res.json(facultad);
  } catch (error) {
    handleError(res, error);
  }
}

async function eliminarFacultad(req, res) {
  const { id } = req.params;
  try {
    const facultad = await Facultad.findByPk(id);
    if (!facultad) {
      return res.status(404).json({ message: 'Facultad no encontrada' });
    }

    await facultad.destroy();

    return res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
}

async function obtenerFacultad(req, res) {
  const { id } = req.params;
  try {
    const facultad = await Facultad.findByPk(id);
    if (!facultad) {
      return res.status(404).json({ message: 'Facultad no encontrada' });
    }

    res.json(facultad);
  } catch (error) {
    handleError(res, error);
  }
}


module.exports = {
  agregarFacultad,
  obtenerFacultades,
  actualizarFacultad,
  eliminarFacultad,
  obtenerFacultad,
};
