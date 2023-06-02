"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const laboratorios_1 = require("../controller/laboratorios");
const router = (0, express_1.Router)();
router.post("/", laboratorios_1.crearLaboratorio);
router.delete("/:id", laboratorios_1.borrarLboratorio);
router.get("/", laboratorios_1.obtenerTLaboratorio);
exports.default = router;
