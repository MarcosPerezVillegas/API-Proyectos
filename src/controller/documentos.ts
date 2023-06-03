import { RequestHandler } from "express";
import {documentos} from "../models/documento";

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
    return res.status(200).json({message: "documentos obtenidos", data:obtdocumento});   
}