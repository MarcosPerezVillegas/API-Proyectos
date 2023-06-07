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
const config_1 = require("../db/config");
const crearProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var proyecto = yield proyectos_1.Proyecto.create(Object.assign({}, req.body));
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo crear el proyecto" });
        }
        var id = req.body.id;
        var status = yield config_1.connection.query("INSERT INTO `status`(`proyecto_id`, `estado`) VALUES ('" + id + "','Disponible')");
        if (!status) {
            return res.status(401).json({ message: "No se pudo asignar un estado al proyecto" });
        }
        return res.status(200).json({ message: "Proyecto creado!", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.crearProyecto = crearProyecto;
const listarProyectos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var proyectos = yield proyectos_1.Proyecto.findAll({
            attributes: { exclude: ["usuario_codigo"] },
        });
        if (!proyectos) {
            return res.status(401).json({ message: "No se pudo encontrar los proyectos" });
        }
        return res.status(200).json({ message: "Proyectos encontrados: " + proyectos.length, data: proyectos });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.listarProyectos = listarProyectos;
const BuscarProyectoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
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
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.BuscarProyectoId = BuscarProyectoId;
const BuscarProyectoNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombrep } = req.params;
    try {
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
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.BuscarProyectoNombre = BuscarProyectoNombre;
const BuscarProyectoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_codigo } = req.params;
    try {
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
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.BuscarProyectoUsuario = BuscarProyectoUsuario;
const BuscarProyectosCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carrera_clave } = req.params;
    try {
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
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyectos encontrados", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.BuscarProyectosCarrera = BuscarProyectosCarrera;
const actualizarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const proyectoActualizado = yield proyectos_1.Proyecto.findByPk(id);
        var proyecto = yield proyectos_1.Proyecto.update(Object.assign({}, req.body), { where: { id } });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo actualizar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto actualizado", data: proyectoActualizado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.actualizarProyecto = actualizarProyecto;
const eliminarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
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
        if (!proyectoEliminado) {
            return res.status(401).json({ message: "No se pudo eliminar el proyecto" });
        }
        yield proyectos_1.Proyecto.destroy({ where: { id } });
        return res.status(200).json({ message: "Proyecto eliminado", data: proyectoEliminado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.eliminarProyecto = eliminarProyecto;
