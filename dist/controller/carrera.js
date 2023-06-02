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
exports.actualizarCarrera = exports.obtenerCarreraClave = exports.obtenerTCarreras = exports.borrarCarrera = exports.crearCarrera = void 0;
const carrera_1 = require("../models/carrera");
const proyectos_1 = require("../models/proyectos");
const crearCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var carrera = yield carrera_1.Carrera.create(Object.assign({}, req.body));
    return res.status(200).json({ message: "Carrera creada ok!", data: carrera });
});
exports.crearCarrera = crearCarrera;
const borrarCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clave } = req.params;
    const carreraEliminada = yield carrera_1.Carrera.findByPk(clave);
    yield carrera_1.Carrera.destroy({ where: { clave } });
    return res.status(200).json({ messege: "Carrera borrado ok!", data: carreraEliminada });
});
exports.borrarCarrera = borrarCarrera;
const obtenerTCarreras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todosLasCarreras = yield carrera_1.Carrera.findAll({
        include: proyectos_1.Proyecto
    });
    return res.status(200).json({ message: "Carrera obtenidos ok!", data: todosLasCarreras });
});
exports.obtenerTCarreras = obtenerTCarreras;
const obtenerCarreraClave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clave } = req.params;
    const carreraActualizado = yield carrera_1.Carrera.findByPk(clave);
    if (!carreraActualizado) {
        return res.status(401).json({ message: "Carrera no encontrada" });
    }
    return res.status(200).json({ message: "Carrera encontrada!", data: carreraActualizado });
});
exports.obtenerCarreraClave = obtenerCarreraClave;
const actualizarCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clave } = req.params;
    const carreraActualizada = yield carrera_1.Carrera.findByPk(clave);
    var carrera = yield carrera_1.Carrera.update(Object.assign({}, req.body), { where: { clave } });
    return res.status(200).json({ message: "Carrera actualizada!", carreraActualizada });
});
exports.actualizarCarrera = actualizarCarrera;
