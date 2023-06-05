import { RequestHandler } from "express";
import {documentos} from "../models/documento";
import {Sequelize} from "sequelize-typescript";
import { Proyecto } from "../models/proyectos";
import { Usuario } from "../models/usuarios";

const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root", 
    password: "kaminomizo", 
    database: "banco2",
    port: 33061
});

export const adddoc:RequestHandler = async (req,res,next) =>{
    var doc = await documentos.create({...req.body});
    return res.status(200).json({message: "documento creado", data:doc});
}

export const dropdoc:RequestHandler = async (req,res,next) =>{
    const {id} = req.params;
    const doceliminado: documentos|null = await documentos.findByPk(id);
    await documentos.destroy({where:{id}});
    return res.status(200).json({message: "documento eliminado", data:doceliminado});
}

export const obtdoc:RequestHandler = async (req,res,next) =>{
    const obtdocumento:documentos [] = await documentos.findAll();
    return res.status(200).json({message: "Documentos obtenidos: "+obtdocumento.length, data:obtdocumento});   
}

export const obtdocID:RequestHandler = async (req,res,next) =>{
    const {id} = req.params;
    const docobtenido: documentos|null = await documentos.findByPk(id, {
        include: Proyecto
    });
    return res.status(200).json({message: "Documento obtenido: ", data:docobtenido});   
}

export const obtuserdoc:RequestHandler = async (req,res,next) =>{
    const userdoc = await Proyecto.findByPk(req.body.Proyecto_id,{
        include:{model: Proyecto,
            attributes: {exclude:["password", "email", "celular", "rol_id"]}},
        attributes: {exclude:["id", "nombrep", "objetivos", "fechainicio", "fechafinal","usuario_codigo","carrera_clave"]}
    });
    return res.status(200).json({message: "Usuarios obtenidos: ", data:userdoc});   
}

export const upddoc: RequestHandler = async (req,res) => {
    const {id} = req.params;
    const docActualizado: documentos | null = await documentos.findByPk(id);
    await documentos.update({...req.body}, {where:{id}});
    return res.status(200).json({message:"Documento actualizado!",docActualizado});
}

export const obtexel:RequestHandler = async (req,res,next) =>{
    var XLSX = require("xlsx");
    const [results, metadata] = await connection.query('SELECT * FROM archivos_documentos');
    const workSheet = XLSX.utils.json_to_sheet(results);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 2");
    XLSX.writeFile(workBook, "C:\\Users\\marti\\Desktop\\Proyecto\\banco-api\\plantilla_2.xlsx");
    return res.status(200).json({message: "Excel generado: ", data:results});   
}