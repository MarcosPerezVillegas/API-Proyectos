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
exports.obtexel = exports.upddoc = exports.obtuserdoc = exports.obtdocID = exports.obtdoc = exports.dropdoc = exports.adddoc = void 0;
const documento_1 = require("../models/documento");
const sequelize_typescript_1 = require("sequelize-typescript");
const proyectos_1 = require("../models/proyectos");
const db = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    port: 33061
});
const adddoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var doc = yield documento_1.documentos.create(Object.assign({}, req.body));
    if (!doc) {
        return res.status(401).json({ message: "No se pudo crear el documento" });
    }
    return res.status(200).json({ message: "documento creado", data: doc });
});
exports.adddoc = adddoc;
const dropdoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const doceliminado = yield documento_1.documentos.findByPk(id);
    yield documento_1.documentos.destroy({ where: { id } });
    if (!doceliminado) {
        return res.status(401).json({ message: "No se pudo eliminar el documento" });
    }
    return res.status(200).json({ message: "documento eliminado", data: doceliminado });
});
exports.dropdoc = dropdoc;
const obtdoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const obtdocumento = yield documento_1.documentos.findAll();
    if (!obtdocumento) {
        return res.status(401).json({ message: "No se pudo obtener los documentos" });
    }
    return res.status(200).json({ message: "Documentos obtenidos: " + obtdocumento.length, data: obtdocumento });
});
exports.obtdoc = obtdoc;
const obtdocID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const docobtenido = yield documento_1.documentos.findByPk(id, {
        include: proyectos_1.Proyecto
    });
    if (!docobtenido) {
        return res.status(401).json({ message: "No se pudo obtener el documento" });
    }
    return res.status(200).json({ message: "Documento obtenido: ", data: docobtenido });
});
exports.obtdocID = obtdocID;
const obtuserdoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userdoc = yield documento_1.documentos.findByPk(id, {
        include: [
            {
                model: proyectos_1.Proyecto,
                include: [
                    {
                        //model: Usuario,
                        attributes: { exclude: ["password", "email", "telefono", "rol_id"] }
                    },
                ],
                attributes: { exclude: ["objetivos", "fechainicio", "fechafinal", "usuario_codigo", "carrera_clave"] }
            }
        ],
        attributes: { exclude: ["Proyecto_id"] }
    });
    if (!userdoc) {
        return res.status(401).json({ message: "No se pudo encontrar a los usuarios" });
    }
    return res.status(200).json({ message: "Usuarios obtenidos: ", data: userdoc });
});
exports.obtuserdoc = obtuserdoc;
const upddoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const docActualizado = yield documento_1.documentos.findByPk(id);
    yield documento_1.documentos.update(Object.assign({}, req.body), { where: { id } });
    if (!docActualizado) {
        return res.status(401).json({ message: "No se puede actualizar el documento" });
    }
    return res.status(200).json({ message: "Documento actualizado!", docActualizado });
});
exports.upddoc = upddoc;
const obtexel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var XLSX = require("xlsx");
    const [results] = yield db.query('SELECT * FROM archivos_documentos');
    if (!results) {
        return res.status(401).json({ message: "No se puede generar el documento" });
    }
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(results);
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    const filepatch = "C:\\Users\\Marcos\\Desktop\\Ecxel\\Ecxelplantilla_exel.xlsx";
    XLSX.writeFile(workBook, filepatch);
    return res.status(200).json({ message: "Excel generado: ", data: results });
});
exports.obtexel = obtexel;
