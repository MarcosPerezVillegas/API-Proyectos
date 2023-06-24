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
exports.actualizarRol = exports.obtenerRolId = exports.obtenerTRoles = exports.borrarRol = exports.crearRol = void 0;
const roles_1 = require("../models/roles");
//import { Usuario } from "../models/maestros";
const crearRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var rol = yield roles_1.Rol.create(Object.assign({}, req.body));
        if (!rol) {
            return res.status(401).json({ message: "No se pudo crear el rol", data: rol });
        }
        return res.status(200).json({ message: "Rol creado ok!", data: rol });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.crearRol = crearRol;
const borrarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rolEliminado = yield roles_1.Rol.findByPk(id);
        yield roles_1.Rol.destroy({ where: { id } });
        if (!rolEliminado) {
            return res.status(401).json({ message: "No se pudo eliminar el rol", data: rolEliminado });
        }
        return res.status(200).json({ messege: "Rol Eliminado ok!", data: rolEliminado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.borrarRol = borrarRol;
const obtenerTRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todosLosRoles = yield roles_1.Rol.findAll();
        if (!todosLosRoles) {
            return res.status(401).json({ message: "No se pudo obtener los roles", data: todosLosRoles });
        }
        return res.status(200).json({ message: "Roles obtenidos ok!", data: todosLosRoles });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.obtenerTRoles = obtenerTRoles;
const obtenerRolId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rolId = yield roles_1.Rol.findByPk(id, {
            include: {
                //model: Usuario,
                attributes: { exclude: ["password"] },
            },
        });
        if (!rolId) {
            return res.status(401).json({ message: "No se pudo obtener el rol", data: rolId });
        }
        return res.status(200).json({ message: "Rol obtenido ok!", data: rolId });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.obtenerRolId = obtenerRolId;
const actualizarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield roles_1.Rol.update(Object.assign({}, req.body), { where: { id } });
        const rolActualizado = yield roles_1.Rol.findByPk(id);
        if (!rolActualizado) {
            return res.status(401).json({ message: "No se pudo actualizar el rol", data: rolActualizado });
        }
        return res.status(200).json({ message: "Rol actualizado!", data: rolActualizado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.actualizarRol = actualizarRol;
