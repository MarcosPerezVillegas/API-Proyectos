import { RequestHandler } from "express";
import {Tarea} from "../models/tareas";

export const adddoc:RequestHandler = async (req,res,next) =>{
    var doc = await Tarea.create({...req.body});
    return res.status(200).json({message: "documento creado", data:doc});
}

export const dropdoc:RequestHandler = async (req,res,next) =>{
    const {id} = req.params;
    const doceliminado: Tarea|null = await Tarea.findByPk(id);
    await Tarea.destroy({where:{id}});
    return res.status(200).json({message: "documento eliminado", data:doceliminado});
}

export const obtdoc:RequestHandler = async (req,res,next) =>{
    const obtdocumento:Tarea [] = await Tarea.findAll();
    return res.status(200).json({message: "documentos obtenidos", data:obtdocumento});   
}