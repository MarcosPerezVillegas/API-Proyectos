"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status_1 = require("../controller/status");
const verify_token_1 = require("../middleware/verify_token");
const router = (0, express_1.Router)();
router.post("/", verify_token_1.autorizar, status_1.addstat);
router.delete("/:Proyecto_id", verify_token_1.autorizar, status_1.dropstat);
router.get("/", status_1.obtstat);
exports.default = router;