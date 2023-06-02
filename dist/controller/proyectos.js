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
exports.eliminarProyecto = exports.actualizarProyecto = exports.BuscarProyectosCarrera = exports.BuscarProyectoUsuario = exports.BuscarProyectoNombre = exports.BuscarProyectoId = exports.listarProyectos = exports.crearProyecto = void 0;
const proyectos_1 = require("../models/proyectos");
const usuarios_1 = require("../models/usuarios");
const carrera_1 = require("../models/carrera");
const crearProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var proyecto = yield proyectos_1.Proyecto.create(Object.assign({}, req.body));
    return res.status(200).json({ message: "Proyecto creado!", data: proyecto });
});
exports.crearProyecto = crearProyecto;
const listarProyectos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var proyectos = yield proyectos_1.Proyecto.findAll({
        attributes: { exclude: ["usuario_codigo"] },
    });
    return res.status(200).json({ message: "Proyectos encontrados: " + proyectos.length, data: proyectos });
});
exports.listarProyectos = listarProyectos;
const BuscarProyectoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const proyecto = yield proyectos_1.Proyecto.findByPk(id, {
        include: [
            {
                model: usuarios_1.Usuario,
                attributes: { exclude: ["password"] },
            },
            carrera_1.Carrera,
        ],
        attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
    });
    return res.status(200).json({ message: "Proyecto encontrado por ID", data: proyecto });
});
exports.BuscarProyectoId = BuscarProyectoId;
const BuscarProyectoNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombrep } = req.params;
    const proyecto = yield proyectos_1.Proyecto.findOne({
        where: { nombrep },
        include: [
            {
                model: usuarios_1.Usuario,
                attributes: { exclude: ["password"] },
            },
            carrera_1.Carrera,
        ],
        attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
    });
    return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
});
exports.BuscarProyectoNombre = BuscarProyectoNombre;
const BuscarProyectoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_codigo } = req.params;
    const proyecto = yield proyectos_1.Proyecto.findOne({
        where: { usuario_codigo },
        include: [
            {
                model: usuarios_1.Usuario,
                attributes: { exclude: ["password"] },
            },
            carrera_1.Carrera,
        ],
        attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
    });
    return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
});
exports.BuscarProyectoUsuario = BuscarProyectoUsuario;
const BuscarProyectosCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carrera_clave } = req.params;
    const proyecto = yield proyectos_1.Proyecto.findAll({
        where: { carrera_clave },
        include: [
            {
                model: usuarios_1.Usuario,
                attributes: { exclude: ["password"] },
            },
            carrera_1.Carrera,
        ],
        attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
    });
    return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
});
exports.BuscarProyectosCarrera = BuscarProyectosCarrera;
const actualizarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const proyectoActualizado = yield proyectos_1.Proyecto.findByPk(id);
    var proyecto = yield proyectos_1.Proyecto.update(Object.assign({}, req.body), { where: { id } });
    return res.status(200).json({ message: "Proyecto actualizado", data: proyectoActualizado });
});
exports.actualizarProyecto = actualizarProyecto;
const eliminarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const proyectoEliminado = yield proyectos_1.Proyecto.findByPk(id, {
        include: [
            {
                model: usuarios_1.Usuario,
                attributes: { exclude: ["password"] },
            },
            carrera_1.Carrera,
        ],
        attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
    });
    yield proyectos_1.Proyecto.destroy({ where: { id } });
    return res.status(200).json({ message: "Proyecto eliminado", data: proyectoEliminado });
});
exports.eliminarProyecto = eliminarProyecto;
