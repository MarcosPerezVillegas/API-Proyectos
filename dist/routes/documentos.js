"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentos_1 = require("../controller/documentos");
const verify_token_1 = require("../middleware/verify_token");
const router = (0, express_1.Router)();
router.post("/", verify_token_1.autorizar, documentos_1.adddoc);
router.delete("/:id", verify_token_1.autorizar, documentos_1.dropdoc);
router.get("/", documentos_1.obtdoc);
router.get("/Usuarios/:id", documentos_1.obtuserdoc);
router.get("/ID/:id", documentos_1.obtdocID);
router.get("/Exel", documentos_1.obtexel);
router.put("/:id", verify_token_1.autorizar, documentos_1.upddoc);
exports.default = router;
