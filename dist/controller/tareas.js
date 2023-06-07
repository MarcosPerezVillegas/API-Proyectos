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
exports.updtarea = exports.obttareaid = exports.obtdoc = exports.dropdoc = exports.adddoc = void 0;
const tareas_1 = require("../models/tareas");
const adddoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var doc = yield tareas_1.Tarea.create(Object.assign({}, req.body));
    return res.status(200).json({ message: "documento creado", data: doc });
});
exports.adddoc = adddoc;
const dropdoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const doceliminado = yield tareas_1.Tarea.findByPk(id);
    yield tareas_1.Tarea.destroy({ where: { id } });
    return res.status(200).json({ message: "documento eliminado", data: doceliminado });
});
exports.dropdoc = dropdoc;
const obtdoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const obtdocumento = yield tareas_1.Tarea.findAll();
    return res.status(200).json({ message: "documentos obtenidos", data: obtdocumento });
});
exports.obtdoc = obtdoc;
const obttareaid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const obtdocumento = yield tareas_1.Tarea.findByPk(id);
    return res.status(200).json({ message: "tarea obtenida", data: obtdocumento });
});
exports.obttareaid = obttareaid;
const updtarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tareaActualizado = yield tareas_1.Tarea.findByPk(id);
    yield tareas_1.Tarea.update(Object.assign({}, req.body), { where: { id } });
    return res.status(200).json({ message: "Tarea actualizada!", tareaActualizado });
});
exports.updtarea = updtarea;
