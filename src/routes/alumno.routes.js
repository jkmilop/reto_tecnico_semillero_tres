const { Router } = require("express");
const {
  agregarAlumno,
  obtenerAlumnos,
  actualizarAlumno,
  eliminarAlumno,
  obtenerAlumno,
  listarAlumnosConInfo,
  buscarAlumnosPorFacultad,

} = require("../controllers/alumno.controller.js");

const router = Router();

router.post("/", agregarAlumno);
router.get("/", obtenerAlumnos);
router.put("/:id", actualizarAlumno);
router.delete("/:id", eliminarAlumno);
router.get("/:id", obtenerAlumno);
router.get("/info/:id", listarAlumnosConInfo);
router.get("/:nombre_facultad", buscarAlumnosPorFacultad);
module.exports = router;
