const { Router } = require("express");
const {
  agregarCurso,
  obtenerCursos,
  actualizarCurso,
  eliminarCurso,
  obtenerCurso,
} = require("../controllers/curso.controller.js");

const router = Router();

router.get("/", obtenerCursos);
router.post("/", agregarCurso);
router.put("/:id", actualizarCurso);
router.get("/:id", obtenerCurso);
router.delete("/:id", eliminarCurso);

module.exports = router;
