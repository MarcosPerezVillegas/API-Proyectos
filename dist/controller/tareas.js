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
exports.updtarea = exports.obttareapro = exports.obttareanombre = exports.obttareaid = exports.obttarea = exports.droptarea = exports.addtarea = void 0;
const tareas_1 = require("../models/tareas");
const proyectos_1 = require("../models/proyectos");
const addtarea = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var tarea = yield tareas_1.Tarea.create(Object.assign({}, req.body));
        if (!tarea) {
            return res.status(401).json({ message: "No se pudo crear la tarea" });
        }
        return res.status(200).json({ message: "Tarea creada", data: tarea });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.addtarea = addtarea;
const droptarea = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tareaeliminada = yield tareas_1.Tarea.findByPk(id);
        yield tareas_1.Tarea.destroy({ where: { id } });
        if (!tareaeliminada) {
            return res.status(401).json({ message: "No se pudo eliminar la tarea" });
        }
        return res.status(200).json({ message: "Tarea eliminada", data: tareaeliminada });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.droptarea = droptarea;
const obttarea = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obttarea = yield tareas_1.Tarea.findAll({ include: proyectos_1.Proyecto });
        if (!obttarea) {
            return res.status(401).json({ message: "No se pudo encontrar las tareas" });
        }
        return res.status(200).json({ message: "Tareas obtenidas", data: obttarea });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.obttarea = obttarea;
const obttareaid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const obttarea = yield tareas_1.Tarea.findByPk(id);
        if (!obttarea) {
            return res.status(401).json({ message: "No se pudo encontrar la tarea" });
        }
        return res.status(200).json({ message: "tarea obtenida", data: obttarea });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.obttareaid = obttareaid;
const obttareanombre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    try {
        const obttarea = yield tareas_1.Tarea.findOne({ where: { nombre } });
        if (!obttarea) {
            return res.status(401).json({ message: "No se pudo encontrar la tarea" });
        }
        return res.status(200).json({ message: "tarea obtenida", data: obttarea });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.obttareanombre = obttareanombre;
const obttareapro = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Proyecto_id } = req.params;
    try {
        const obttarea = yield tareas_1.Tarea.findAll({ where: { Proyecto_id }, include: proyectos_1.Proyecto });
        if (!obttarea) {
            return res.status(401).json({ message: "No se pudo encontrar la tarea" });
        }
        return res.status(200).json({ message: "tarea obtenida", data: obttarea });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.obttareapro = obttareapro;
const updtarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tareaActualizada = yield tareas_1.Tarea.findByPk(id);
        yield tareas_1.Tarea.update(Object.assign({}, req.body), { where: { id } });
        if (!tareaActualizada) {
            return res.status(401).json({ message: "No se pudo actualizar la tarea" });
        }
        return res.status(200).json({ message: "Tarea actualizada!", tareaActualizada });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.updtarea = updtarea;
