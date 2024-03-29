"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status_1 = require("../controller/status");
const verify_token_1 = require("../middleware/verify_token");
const router = (0, express_1.Router)();
router.post("/", verify_token_1.autorizar, status_1.addstat);
router.delete("/:id", verify_token_1.autorizar, status_1.dropstat);
router.put("/:id", verify_token_1.autorizar, status_1.updstat);
router.get("/", status_1.obtstat);
router.get("/Estado/:Estado", status_1.BuscarStatus);
exports.default = router;
