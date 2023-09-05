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
exports.BuscarStatus = exports.updstat = exports.BuscarProyecto = exports.obtstat = exports.dropstat = exports.addstat = void 0;
const status_1 = require("../models/status");
const proyectos_1 = require("../models/proyectos");
const addstat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var stat = yield status_1.Status.create(Object.assign({}, req.body));
        if (!stat) {
            return res.status(401).json({ message: "No se pudo crear el status" });
        }
        return res.status(200).json({ message: "status creado", data: stat });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.addstat = addstat;
const dropstat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const stateliminado = yield status_1.Status.findByPk(id);
        const stat = yield status_1.Status.destroy({ where: { id } });
        if (!stat) {
            return res.status(401).json({ message: "No se pudo eliminar el status" });
        }
        return res.status(200).json({ message: "status eliminado", data: stateliminado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.dropstat = dropstat;
const obtstat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obtstatus = yield status_1.Status.findAll();
        if (!exports.obtstat) {
            return res.status(401).json({ message: "No se pudo encontrar el status" });
        }
        return res.status(200).json({ message: "status obtenidos", data: obtstatus });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.obtstat = obtstat;
const BuscarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Proyecto_id } = req.params;
    try {
        const proyecto = yield status_1.Status.findOne({
            where: { Proyecto_id },
            include: proyectos_1.Proyecto,
            attributes: { exclude: ["Proyecto_id"] }
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el documento" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.BuscarProyecto = BuscarProyecto;
const updstat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const statActualizado = yield status_1.Status.findOne({ where: { id } });
        const stat = yield status_1.Status.update(Object.assign({}, req.body), { where: { id } });
        if (!stat) {
            return res.status(401).json({ message: "No se pudo actualizar el status" });
        }
        return res.status(200).json({ message: "Status actualizado!", statActualizado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.updstat = updstat;
const BuscarStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Estado } = req.params;
    try {
        const status = yield status_1.Status.findOne({
            where: { Estado },
        });
        if (!status) {
            return res.status(401).json({ message: "No se pudo encontrar el estado" });
        }
        return res.status(200).json({ message: "Estado encontrado", data: status });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.BuscarStatus = BuscarStatus;
