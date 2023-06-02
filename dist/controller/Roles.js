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
exports.actualizarRol = exports.obtenerTRoles = exports.borrarRol = exports.crearRol = void 0;
const roles_1 = require("../models/roles");
const usuarios_1 = require("../models/usuarios");
const crearRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var rol = yield roles_1.Rol.create(Object.assign({}, req.body));
    return res.status(200).json({ message: "Rol creado ok!", data: rol });
});
exports.crearRol = crearRol;
const borrarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rolEliminado = yield roles_1.Rol.findByPk(id);
    yield roles_1.Rol.destroy({ where: { id } });
    return res.status(200).json({ messege: "Rol borrado ok!", data: rolEliminado });
});
exports.borrarRol = borrarRol;
const obtenerTRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todosLosRoles = yield roles_1.Rol.findAll({
        include: usuarios_1.Usuario,
        attributes: { exclude: ["password"] }
    });
    return res.status(200).json({ message: "Roles obtenidos ok!", data: todosLosRoles });
});
exports.obtenerTRoles = obtenerTRoles;
const actualizarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield roles_1.Rol.update(Object.assign({}, req.body), { where: { id } });
    const rolActualizado = yield roles_1.Rol.findByPk(id);
    return res.status(200).json({ message: "Rol actualizado!", data: rolActualizado });
});
exports.actualizarRol = actualizarRol;
