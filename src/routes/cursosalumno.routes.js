const { Router } = require("express");
const {
  agregarAlumno,
  obtenerAlumnos,
  actualizarAlumno,
  eliminarAlumno,
  obtenerAlumno,
} = require("../controllers/alumno.controller.js");

const router = Router();

router.get("/", obtenerAlumnos);
router.post("/", agregarAlumno);
router.put("/:id", actualizarAlumno);
router.get("/:id", obtenerAlumno);
router.delete("/:id", eliminarAlumno);

module.exports = router;
