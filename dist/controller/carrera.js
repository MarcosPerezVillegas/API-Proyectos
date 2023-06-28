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
exports.actualizarCarrera = exports.obtenerCarreraNombre = exports.obtenerCarreraClave = exports.obtenerTCarreras = exports.borrarCarrera = exports.crearCarrera = void 0;
const carrera_1 = require("../models/carrera");
const proyectos_1 = require("../models/proyectos");
const crearCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var carrera = yield carrera_1.Carrera.create(Object.assign({}, req.body));
        if (!carrera) {
            return res.status(401).json({ message: "No se pudo crear la tarea" });
        }
        return res.status(200).json({ message: "Carrera creada ok!", data: carrera });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.crearCarrera = crearCarrera;
const borrarCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clave } = req.params;
    try {
        const carreraEliminada = yield carrera_1.Carrera.findByPk(clave);
        var carrera = yield carrera_1.Carrera.destroy({ where: { clave } });
        if (!carrera) {
            return res.status(401).json({ message: "No se pudo eliminar la tarea" });
        }
        return res.status(200).json({ message: "Carrera eliminada ok!", data: carreraEliminada });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.borrarCarrera = borrarCarrera;
const obtenerTCarreras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todosLasCarreras = yield carrera_1.Carrera.findAll({
            include: proyectos_1.Proyecto
        });
        if (!todosLasCarreras) {
            return res.status(401).json({ message: "No se pudo obtener las carreras" });
        }
        return res.status(200).json({ message: "Carrera obtenidos ok!", data: todosLasCarreras });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.obtenerTCarreras = obtenerTCarreras;
const obtenerCarreraClave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clave } = req.params;
    try {
        const carreraClave = yield carrera_1.Carrera.findByPk(clave, {
            include: [
                {
                    model: proyectos_1.Proyecto,
                    attributes: { exclude: ["usuario_codigo"] },
                },
            ],
        });
        if (!carreraClave) {
            return res.status(401).json({ message: "No se pudo encontrar la carrera" });
        }
        return res.status(200).json({ message: "Carrera encontrada!", data: carreraClave });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.obtenerCarreraClave = obtenerCarreraClave;
const obtenerCarreraNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    try {
        const CarreraNombre = yield carrera_1.Carrera.findOne({
            where: { nombre },
            include: [
                {
                    model: proyectos_1.Proyecto,
                    attributes: { exclude: ["usuario_codigo"] },
                },
            ],
        });
        if (!CarreraNombre) {
            return res.status(401).json({ message: "No se pudo encontrar la carrera" });
        }
        return res.status(200).json({ message: "Carrera encontrada!", data: CarreraNombre });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.obtenerCarreraNombre = obtenerCarreraNombre;
const actualizarCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clave } = req.params;
    try {
        const carreraActualizada = yield carrera_1.Carrera.findByPk(clave);
        var carrera = yield carrera_1.Carrera.update(Object.assign({}, req.body), { where: { clave } });
        if (!carrera) {
            return res.status(401).json({ message: "No se pudo actualizar la carrera" });
        }
        return res.status(200).json({ message: "Carrera actualizada!", carreraActualizada });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.actualizarCarrera = actualizarCarrera;
