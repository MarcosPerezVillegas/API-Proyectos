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
exports.restaurarUsuario = exports.eliminarUsuarioPerma = exports.eliminarUsuario = exports.actualizarUsuario = exports.infoCompletaUsuarioEliminado = exports.infoCompletaUsuario = exports.listarUsuariosElimidanos = exports.listarUsuarios = exports.crearUsuario = void 0;
const usuarios_1 = require("../models/usuarios");
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const roles_1 = require("../models/roles");
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var usuario = yield usuarios_1.Usuario.create({
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            email: req.body.email,
            password: yield bcrypt_1.default.hash(req.body.password, 10),
            telefono: req.body.telefono,
            rol_id: req.body.rol_id
        });
        if (!usuario) {
            return res.status(401).json({ message: "No se pudo crear al usuario", data: usuario });
        }
        return res.status(200).json({ message: "Usuario creado", data: usuario });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.crearUsuario = crearUsuario;
const listarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var usuarios = yield usuarios_1.Usuario.findAll({
            attributes: { exclude: ["password"] }
        });
        if (!usuarios) {
            return res.status(401).json({ message: "No se pudo encontar los usuarios", data: usuarios });
        }
        return res.status(200).json({ message: "Usuarios encontrados: " + usuarios.length, data: usuarios });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.listarUsuarios = listarUsuarios;
const listarUsuariosElimidanos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var usuarios = yield usuarios_1.Usuario.findAll({
            where: {
                deletedAt: { [sequelize_1.Op.not]: null }
            },
            paranoid: false,
            attributes: { exclude: ["password"] }
        });
        if (!usuarios) {
            return res.status(401).json({ message: "No se pudo encontar los usuarios", data: usuarios });
        }
        return res.status(200).json({ message: "Usuarios encontrados: " + usuarios.length, data: usuarios });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.listarUsuariosElimidanos = listarUsuariosElimidanos;
const infoCompletaUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        var usuario = yield usuarios_1.Usuario.findByPk(codigo, {
            include: roles_1.Rol,
            attributes: { exclude: ["rol_id"] }
        });
        if (!usuario) {
            return res.status(401).json({ message: "No se pudo encontar al usuario", data: usuario });
        }
        return res.status(200).json({ message: "Usuario encontrado con toda su info", data: usuario });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.infoCompletaUsuario = infoCompletaUsuario;
const infoCompletaUsuarioEliminado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        var usuario = yield usuarios_1.Usuario.findByPk(codigo, {
            include: roles_1.Rol,
            paranoid: false,
            attributes: { exclude: ["rol_id"] }
        });
        if (!usuario) {
            return res.status(401).json({ message: "No se pudo encontar al usuario", data: usuario });
        }
        return res.status(200).json({ message: "Usuario encontrado con toda su info", data: usuario });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.infoCompletaUsuarioEliminado = infoCompletaUsuarioEliminado;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        const usuarioActualizado = yield usuarios_1.Usuario.findByPk(codigo);
        var usuario = yield usuarios_1.Usuario.update(Object.assign({}, req.body), { where: { codigo: codigo } });
        if (!usuario) {
            return res.status(401).json({ message: "No se pudo actualizar el usuario", data: usuario });
        }
        return res.status(200).json({ message: "Usuario actualizado", data: usuarioActualizado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        const usuarioEliminado = yield usuarios_1.Usuario.findByPk(codigo);
        var usuario = yield usuarios_1.Usuario.destroy({ where: { codigo } });
        if (!usuario) {
            return res.status(401).json({ message: "No se pudo eliminar el usuario", data: usuario });
        }
        return res.status(200).json({ message: "Usuario eliminado", data: usuarioEliminado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.eliminarUsuario = eliminarUsuario;
const eliminarUsuarioPerma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        const usuarioEliminado = yield usuarios_1.Usuario.findByPk(codigo);
        var usuario = yield usuarios_1.Usuario.destroy({ where: { codigo }, force: true });
        if (!usuario) {
            return res.status(401).json({ message: "No se pudo eliminar el usuario", data: usuario });
        }
        return res.status(200).json({ message: "Usuario eliminado", data: usuarioEliminado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.eliminarUsuarioPerma = eliminarUsuarioPerma;
const restaurarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        const usuarioaRestaurar = yield usuarios_1.Usuario.findByPk(codigo, { paranoid: false });
        var usuario = yield (usuarioaRestaurar === null || usuarioaRestaurar === void 0 ? void 0 : usuarioaRestaurar.restore());
        if (!usuario) {
            return res.status(401).json({ message: "No se pudo recuperar el usuario", data: usuario });
        }
        return res.status(200).json({ message: "Se restauró un usuario", data: usuarioaRestaurar });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.restaurarUsuario = restaurarUsuario;
