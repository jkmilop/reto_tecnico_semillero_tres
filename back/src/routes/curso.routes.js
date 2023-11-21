const { Router } = require("express");
const {
  agregarCurso,
  obtenerCursos,
  actualizarCurso,
  eliminarCurso,
  obtenerCurso,
  obtenerCursoPorNombre,
  obtenerCursosPorEstadoCupos,
} = require("../controllers/curso.controller.js");

const router = Router();

router.post("/", agregarCurso);
router.get("/", obtenerCursos);
router.put("/:id", actualizarCurso);
router.delete("/:id", eliminarCurso);
router.get("/:id", obtenerCurso);
router.get("/:nombre", obtenerCursoPorNombre);
router.get("/:tieneCupos", obtenerCursosPorEstadoCupos);
module.exports = router;
