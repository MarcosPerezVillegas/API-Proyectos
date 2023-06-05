"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtstat = exports.dropstat = exports.addstat = void 0;
const status_1 = require("../models/status");
const addstat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var stat = yield status_1.Status.create(Object.assign({}, req.body));
    return res.status(200).json({ message: "status creado", data: stat });
});
exports.addstat = addstat;
const dropstat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { proyecto_id } = req.params;
    const stateliminado = yield status_1.Status.findByPk(proyecto_id);
    yield status_1.Status.destroy({ where: { proyecto_id } });
    return res.status(200).json({ message: "status eliminado", data: stateliminado });
});
exports.dropstat = dropstat;
const obtstat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const obtstatus = yield status_1.Status.findAll();
    return res.status(200).json({ message: "status obtenidos", data: obtstatus });
});
exports.obtstat = obtstat;
