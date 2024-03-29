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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProyecto = exports.actualizarProyecto = exports.BuscarProyectoUsuario = exports.BuscarProyectoNombre = exports.BuscarProyectoId = exports.listarProyectos = exports.crearProyecto = void 0;
const proyectos_1 = require("../models/proyectos");
//import { Usuario } from "../models/maestros";
const carrera_1 = require("../models/carrera");
const status_1 = require("../models/status");
const statusProyecto_1 = require("../models/statusProyecto");
const alumnos_1 = require("../models/alumnos");
const maestros_1 = require("../models/maestros");
const path_1 = __importDefault(require("path"));
const rimraf_1 = require("rimraf");
const fs_1 = __importDefault(require("fs"));
const tareas_1 = require("../models/tareas");
const crearProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proyecto = yield proyectos_1.Proyecto.create(Object.assign({}, req.body));
        const { id } = req.body;
        // Buscar el estado con ID 1 en la tabla Status
        let estado = yield status_1.Status.findByPk(1);
        if (!estado) {
            estado = yield status_1.Status.create({
                id: 1,
                Estado: "En espera"
            });
            const estado1 = yield status_1.Status.create({
                id: 2,
                Estado: "Activo"
            });
            const estado2 = yield status_1.Status.create({
                id: 3,
                Estado: "Terminado"
            });
        }
        // Asociar el estado al proyecto creado
        yield proyecto.$add('statuses', estado);
        //await statusProyecto.findOne({where: {proyecto_id : proyecto.id}});
        yield statusProyecto_1.statusProyecto.update({ nota: "Proyecto creado" }, { where: { proyecto_id: proyecto.id } });
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
            include: [
                {
                    model: alumnos_1.Alumnos,
                    attributes: { exclude: ["password", "telefono"] }
                },
                {
                    model: maestros_1.Maestros,
                    attributes: { exclude: ["password", "telefono"] }
                },
                carrera_1.Carrera,
                status_1.Status,
            ],
            attributes: { exclude: ["carrera_clave", "codigo"] },
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
                    model: maestros_1.Maestros,
                    attributes: { exclude: ["password", "telefono"] }
                },
                carrera_1.Carrera,
                {
                    model: alumnos_1.Alumnos,
                    attributes: { exclude: ["password", "telefono"] }
                },
                { model: status_1.Status },
            ],
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
    const { nombre } = req.params;
    try {
        const proyecto = yield proyectos_1.Proyecto.findOne({
            where: { nombre: nombre },
            attributes: { exclude: ["codigo", "carrera_clave"] },
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
    const { codigo } = req.params;
    try {
        const proyecto = yield proyectos_1.Proyecto.findAll({
            where: { codigo },
            include: [
                carrera_1.Carrera,
                { model: status_1.Status },
            ],
            attributes: { exclude: ["carrera_clave"] },
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
/*
export const BuscarProyectosCarrera: RequestHandler = async (req, res) => {
    const { carrera_clave } = req.params
    try {
        const proyecto: Proyecto[] = await Proyecto.findAll({
            where: { carrera_clave },
            include: [
                {
                    //model: Usuario,
                    attributes: { exclude: ["password"] },
                },
                Carrera,
            ],
            attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyectos encontrados", data: proyecto });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}*/
const actualizarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status_id } = req.body;
    const { nota } = req.body;
    const { dele } = req.body;
    try {
        if (status_id) {
            let status = yield status_1.Status.findOne({ where: { id: status_id } });
            const proyecto = yield proyectos_1.Proyecto.findByPk(id);
            if (proyecto) {
                const term = yield statusProyecto_1.statusProyecto.findOne({ where: { proyecto_id: id, status_id: 3 } });
                let estatus = yield statusProyecto_1.statusProyecto.findOne({ where: { proyecto_id: id, status_id } });
                if (term && !dele) {
                    return res.status(404).json({ message: "No puedes agregar mas estados a un proyecto terminado" });
                }
                if (term && status_id !== 3) {
                    return res.status(404).json({ message: "No puedes quitar estados de un proyecto terminado" });
                }
                if (estatus) {
                    if (dele) {
                        let stat = yield status_1.Status.findOne({ where: { id: status_id } });
                        yield proyecto.$remove('statuses', stat);
                        yield statusProyecto_1.statusProyecto.destroy({ where: { id: estatus.id }, force: true });
                        return res.status(200).json({ message: "Se eliminó el estado del registro del proyecto con exito" });
                    }
                    return res.status(403).json({ message: "Este proyecto ya cuenta con este estado" });
                }
                yield proyecto.$add('statuses', status);
                yield statusProyecto_1.statusProyecto.update({ nota }, { where: { proyecto_id: id, status_id } });
            }
        }
        const proyectoActualizado = yield proyectos_1.Proyecto.findByPk(id);
        var proyecto = yield proyectos_1.Proyecto.update(Object.assign({}, req.body), { where: { id } });
        if (!proyecto) {
            return res.status(404).json({ message: "No se pudo actualizar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto actualizado", data: proyectoActualizado });
    }
    catch (error) {
        return res.status(400).json({ message: "", error });
    }
});
exports.actualizarProyecto = actualizarProyecto;
const eliminarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const proyectoEliminado = yield proyectos_1.Proyecto.findByPk(id);
        if (!proyectoEliminado) {
            return res.status(500).json({ message: "No se pudo eliminar el proyecto" });
        }
        const tareas = yield tareas_1.Tarea.findAll({ where: { Proyecto_id: id } });
        for (const tarea of tareas) {
            yield tarea.destroy();
        }
        yield proyectos_1.Proyecto.destroy({ where: { id } });
        const dir = path_1.default.resolve(__dirname, '..');
        const carpeta = path_1.default.join(dir, 'Archivos');
        const ruta = path_1.default.join(carpeta, proyectoEliminado.id.toString());
        try {
            fs_1.default.readdirSync(ruta);
            rimraf_1.rimraf.sync(ruta);
        }
        catch (_a) { }
        return res.status(200).json({ message: "Proyecto eliminado", data: proyectoEliminado });
    }
    catch (error) {
        return res.status(404).json({ message: error });
    }
});
exports.eliminarProyecto = eliminarProyecto;
