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
exports.alumnToMaest = exports.alumnToAdmin = exports.maestToAlumn = exports.maestToAdmin = exports.adminToMaest = exports.adminToAlumn = void 0;
const alumnos_1 = require("../models/alumnos");
const administradores_1 = require("../models/administradores");
const maestros_1 = require("../models/maestros");
const adminToAlumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        var admin = yield administradores_1.Administradores.findByPk(codigo);
        if (!admin) {
            return res.status(401).json({ message: "No se pudo encontar al administrador", data: admin });
        }
        try {
            var alumno = yield alumnos_1.Alumnos.create({
                codigo: admin.codigo,
                nombre: admin.nombre,
                email: admin.email,
                password: admin.password,
                telefono: admin.telefono,
            });
            yield administradores_1.Administradores.destroy({ where: { codigo: admin.codigo }, force: true });
        }
        catch (error) {
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error });
        }
        return res.status(200).json({ message: "Usuario modificado con exito" });
    }
    catch (error) {
        return res.status(404).json({ message: "Algo salió mal: ", error });
    }
});
exports.adminToAlumn = adminToAlumn;
const adminToMaest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        var admin = yield administradores_1.Administradores.findByPk(codigo);
        if (!admin) {
            return res.status(401).json({ message: "No se pudo encontar al administrador", data: admin });
        }
        try {
            var maestro = yield maestros_1.Maestros.create({
                codigo: admin.codigo,
                nombre: admin.nombre,
                email: admin.email,
                password: admin.password,
                telefono: admin.telefono,
            });
            yield administradores_1.Administradores.destroy({ where: { codigo: admin.codigo }, force: true });
        }
        catch (error) {
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error });
        }
        return res.status(200).json({ message: "Usuario modificado con exito" });
    }
    catch (error) {
        return res.status(404).json({ message: "Algo salió mal: ", error });
    }
});
exports.adminToMaest = adminToMaest;
const maestToAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        var maestro = yield maestros_1.Maestros.findByPk(codigo);
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al maestro", data: maestro });
        }
        try {
            var administrador = yield administradores_1.Administradores.create({
                codigo: maestro.codigo,
                nombre: maestro.nombre,
                email: maestro.email,
                password: maestro.password,
                telefono: maestro.telefono,
            });
            yield maestros_1.Maestros.destroy({ where: { codigo: maestro.codigo }, force: true });
        }
        catch (error) {
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error });
        }
        return res.status(200).json({ message: "Usuario modificado con exito" });
    }
    catch (error) {
        return res.status(404).json({ message: "Algo salió mal: ", error });
    }
});
exports.maestToAdmin = maestToAdmin;
const maestToAlumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        var maestro = yield maestros_1.Maestros.findByPk(codigo);
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al administrador", data: maestro });
        }
        try {
            var alumno = yield alumnos_1.Alumnos.create({
                codigo: maestro.codigo,
                nombre: maestro.nombre,
                email: maestro.email,
                password: maestro.password,
                telefono: maestro.telefono,
            });
            yield maestros_1.Maestros.destroy({ where: { codigo: maestro.codigo }, force: true });
        }
        catch (error) {
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error });
        }
        return res.status(200).json({ message: "Usuario modificado con exito" });
    }
    catch (error) {
        return res.status(404).json({ message: "Algo salió mal: ", error });
    }
});
exports.maestToAlumn = maestToAlumn;
const alumnToAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        var alumno = yield alumnos_1.Alumnos.findByPk(codigo);
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo encontar al alumno", data: alumno });
        }
        try {
            var administrador = yield administradores_1.Administradores.create({
                codigo: alumno.codigo,
                nombre: alumno.nombre,
                email: alumno.email,
                password: alumno.password,
                telefono: alumno.telefono,
            });
            yield alumnos_1.Alumnos.destroy({ where: { codigo: alumno.codigo }, force: true });
        }
        catch (error) {
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error });
        }
        return res.status(200).json({ message: "Usuario modificado con exito" });
    }
    catch (error) {
        return res.status(404).json({ message: "Algo salió mal: ", error });
    }
});
exports.alumnToAdmin = alumnToAdmin;
const alumnToMaest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        var alumno = yield alumnos_1.Alumnos.findByPk(codigo);
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo encontar al alumno", data: alumno });
        }
        try {
            var maestro = yield maestros_1.Maestros.create({
                codigo: alumno.codigo,
                nombre: alumno.nombre,
                email: alumno.email,
                password: alumno.password,
                telefono: alumno.telefono,
            });
            yield alumnos_1.Alumnos.destroy({ where: { codigo: alumno.codigo }, force: true });
        }
        catch (error) {
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error });
        }
        return res.status(200).json({ message: "Usuario modificado con exito" });
    }
    catch (error) {
        return res.status(404).json({ message: "Algo salió mal: ", error });
    }
});
exports.alumnToMaest = alumnToMaest;
