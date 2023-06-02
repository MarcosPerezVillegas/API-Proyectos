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
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarios_1 = require("../models/usuarios");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const usuario = yield usuarios_1.Usuario.findOne({
            where: { email }
        });
        if (!usuario) {
            return res.status(401).json({ message: "El usuario no existe" });
        }
        const passValida = yield bcrypt_1.default.compareSync(password, usuario.password);
        if (!passValida) {
            return res.status(401).json({ message: "La contraseña es incorrecta" });
        }
        const token = jsonwebtoken_1.default.sign({ codigo: usuario.codigo }, "Prueba 123", { expiresIn: '5h' });
        res.json({ token });
    });
}
exports.login = login;
