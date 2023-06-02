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
exports.restaurarUsuario = exports.eliminarUsuario = exports.actualizarUsuario = exports.infoCompletaUsuario = exports.listarUsuarios = exports.crearUsuario = void 0;
const usuarios_1 = require("../models/usuarios");
const bcrypt_1 = __importDefault(require("bcrypt"));
const roles_1 = require("../models/roles");
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var usuario = yield usuarios_1.Usuario.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        email: req.body.email,
        password: yield bcrypt_1.default.hash(req.body.password, 10),
        telefono: req.body.telefono,
        rol_id: req.body.rol_id
    });
    return res.status(200).json({ message: "Usuario creado", data: usuario });
});
exports.crearUsuario = crearUsuario;
const listarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var usuarios = yield usuarios_1.Usuario.findAll({
        include: roles_1.Rol,
        attributes: { exclude: ["password"] }
    });
    return res.status(200).json({ message: "Usuarios encontrados: " + usuarios.length, data: usuarios });
});
exports.listarUsuarios = listarUsuarios;
const infoCompletaUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    var usuario = yield usuarios_1.Usuario.findByPk(codigo, {
        include: roles_1.Rol
    });
    return res.status(200).json({ message: "Usuario encontrado con toda su info", data: usuario });
});
exports.infoCompletaUsuario = infoCompletaUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const usuarioActualizado = yield usuarios_1.Usuario.findByPk(codigo);
    var usuario = yield usuarios_1.Usuario.update(Object.assign({}, req.body), { where: { codigo: codigo } });
    return res.status(200).json({ message: "Usuario actualizado", data: usuarioActualizado });
});
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const usuarioEliminado = yield usuarios_1.Usuario.findByPk(codigo);
    yield usuarios_1.Usuario.destroy({ where: { codigo } });
    return res.status(200).json({ message: "Usuario eliminado", data: usuarioEliminado });
});
exports.eliminarUsuario = eliminarUsuario;
const restaurarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const usuarioaRestaurar = yield usuarios_1.Usuario.findByPk(codigo, { paranoid: false });
    yield (usuarioaRestaurar === null || usuarioaRestaurar === void 0 ? void 0 : usuarioaRestaurar.restore());
    return res.status(200).json({ message: "Se restauró un usuario", data: usuarioaRestaurar });
});
exports.restaurarUsuario = restaurarUsuario;
