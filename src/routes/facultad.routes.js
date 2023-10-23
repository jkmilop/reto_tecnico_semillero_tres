const { Router } = require("express");
const {
  agregarFacultad,
  obtenerFacultades,
  actualizarFacultad,
  eliminarFacultad,
  obtenerFacultad,
} = require("../controllers/facultad.controller.js");

const router = Router();

router.get("/", obtenerFacultades);
router.post("/", agregarFacultad);
router.put("/:id", actualizarFacultad);
router.get("/:id", obtenerFacultad);
router.delete("/:id", eliminarFacultad);

module.exports = router;
