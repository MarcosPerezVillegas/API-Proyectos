"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controller/usuarios");
const verify_token_1 = require("../middleware/verify_token");
const router = (0, express_1.Router)();
router.post("/", verify_token_1.autorizar, usuarios_1.crearUsuario);
router.delete("/:codigo", verify_token_1.autorizar, usuarios_1.eliminarUsuario);
router.get("/", usuarios_1.listarUsuarios);
router.get("/:codigo", verify_token_1.autorizar, usuarios_1.infoCompletaUsuario);
router.put("/:codigo", verify_token_1.autorizar, usuarios_1.actualizarUsuario);
router.get("/", verify_token_1.autorizar, usuarios_1.restaurarUsuario);
exports.default = router;
