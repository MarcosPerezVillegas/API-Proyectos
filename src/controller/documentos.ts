import { RequestHandler } from "express";
import { documentos } from "../models/documento";
import { Sequelize } from "sequelize-typescript";
import { Proyecto } from "../models/proyectos";
//import { Usuario } from "../models/maestros";
import XLSX from 'xlsx';


const db = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    port: 33061
});

export const adddoc: RequestHandler = async (req, res, next) => {
    var doc = await documentos.create({ ...req.body });
    if(!doc){
        return res.status(401).json({ message: "No se pudo crear el documento"});
    }
    return res.status(200).json({ message: "documento creado", data: doc });
}

export const dropdoc: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const doceliminado: documentos | null = await documentos.findByPk(id);
    await documentos.destroy({ where: { id } });
    if(!doceliminado){
        return res.status(401).json({ message: "No se pudo eliminar el documento"});
    }
    return res.status(200).json({ message: "documento eliminado", data: doceliminado });
}

export const obtdoc: RequestHandler = async (req, res, next) => {
    const obtdocumento: documentos[] = await documentos.findAll();
    if(!obtdocumento){
        return res.status(401).json({ message: "No se pudo obtener los documentos"});
    }
    return res.status(200).json({ message: "Documentos obtenidos: " + obtdocumento.length, data: obtdocumento });
}

export const obtdocID: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const docobtenido: documentos | null = await documentos.findByPk(id, {
        include: Proyecto
    });
    if(!docobtenido){
        return res.status(401).json({ message: "No se pudo obtener el documento"});
    }
    return res.status(200).json({ message: "Documento obtenido: ", data: docobtenido });
}

export const obtuserdoc: RequestHandler = async (req, res, next) => {
    const { id } = req.params
    const userdoc: documentos | null = await documentos.findByPk(id, {
        include: [
            {
                model: Proyecto,
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
    if(!userdoc){
        return res.status(401).json({ message: "No se pudo encontrar a los usuarios"});
    }
    return res.status(200).json({ message: "Usuarios obtenidos: ", data: userdoc });
}

export const upddoc: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const docActualizado: documentos | null = await documentos.findByPk(id);
    await documentos.update({ ...req.body }, { where: { id } });
    if(!docActualizado){
        return res.status(401).json({ message: "No se puede actualizar el documento"});
    }
    return res.status(200).json({ message: "Documento actualizado!", docActualizado });
}

export const obtexel: RequestHandler = async (req, res, next) => {
    var XLSX = require("xlsx");
    const [results] = await db.query('SELECT * FROM archivos_documentos');
    if(!results){
        return res.status(401).json({ message: "No se puede generar el documento"});
    }
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(results);
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    const filepatch = "C:\\Users\\Marcos\\Desktop\\Ecxel\\Ecxelplantilla_exel.xlsx"
    XLSX.writeFile(workBook, filepatch);
    return res.status(200).json({ message: "Excel generado: ", data: results });
}