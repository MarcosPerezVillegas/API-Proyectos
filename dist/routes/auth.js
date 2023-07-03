"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../controller/login");
const verify_token_1 = require("../middleware/verify_token");
const router = (0, express_1.Router)();
router.post("/", login_1.login);
router.get("/", verify_token_1.autorizar, (req, res) => {
    const codigo = req.usuarioCodigo;
    const rol = req.usuarioRol;
    const admin = req.usuarioAdmin;
    res.json({ codigo, rol });
});
exports.default = router;
