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
exports.obtenerTLaboratorio = exports.borrarLboratorio = exports.crearLaboratorio = void 0;
const laboratorio_1 = require("../models/laboratorio");
const crearLaboratorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var lab = yield laboratorio_1.Laboratorio.create(Object.assign({}, req.body));
    /*
    Laboratorio.create({
        
        "nombre": "Laboratorio de desarrollo de software",
        "edificio": "CITA",
        "capacidad": 50,
        "usuario_codigo": "123456"
    })
    */
    return res.status(200).json({ message: "Laboratorio creado ok!", data: lab });
});
exports.crearLaboratorio = crearLaboratorio;
const borrarLboratorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const laboratorioEliminado = yield laboratorio_1.Laboratorio.findByPk(id);
    yield laboratorio_1.Laboratorio.destroy({ where: { id } });
    return res.status(200).json({ messege: "Laboratorio borrado ok!", data: laboratorioEliminado });
});
exports.borrarLboratorio = borrarLboratorio;
const obtenerTLaboratorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todosLosLabs = yield laboratorio_1.Laboratorio.findAll();
    return res.status(200).json({ message: "Laboratorios obtenidos ok!", data: todosLosLabs });
});
exports.obtenerTLaboratorio = obtenerTLaboratorio;
