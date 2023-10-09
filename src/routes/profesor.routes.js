const { Router } = require("express");
const {
  agregarProfesor,
  obtenerProfesores,
  actualizarProfesor,
  eliminarProfesor,
  obtenerProfesor,
} = require("../controllers/profesor.controller.js");

const router = Router();

router.get("/", obtenerProfesores);
router.post("/", agregarProfesor);
router.put("/:id", actualizarProfesor);
router.get("/:id", obtenerProfesor);
router.delete("/:id", eliminarProfesor);

module.exports = router;
