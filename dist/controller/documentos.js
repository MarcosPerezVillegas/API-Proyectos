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
exports.obtdoc = exports.dropdoc = exports.adddoc = void 0;
const documento_1 = require("../models/documento");
const adddoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var doc = yield documento_1.documentos.create(Object.assign({}, req.body));
    return res.status(200).json({ message: "documento creado", data: doc });
});
exports.adddoc = adddoc;
const dropdoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const doceliminado = yield documento_1.documentos.findByPk(id);
    yield documento_1.documentos.destroy({ where: { id } });
    return res.status(200).json({ message: "documento eliminado", data: doceliminado });
});
exports.dropdoc = dropdoc;
const obtdoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const obtdocumento = yield documento_1.documentos.findAll();
    return res.status(200).json({ message: "documentos obtenidos", data: obtdocumento });
});
exports.obtdoc = obtdoc;