import { RequestHandler } from "express";
import {Status} from "../models/status";

export const addstat:RequestHandler = async (req,res,next) =>{
    var stat = await Status.create({...req.body});
    return res.status(200).json({message: "status creado", data:stat});
}

export const dropstat:RequestHandler = async (req,res,next) =>{
    const {Proyecto_id} = req.params;
    const stateliminado: Status|null = await Status.findByPk(Proyecto_id);
    await Status.destroy({where:{Proyecto_id}});
    return res.status(200).json({message: "status eliminado", data:stateliminado});
}

export const obtstat:RequestHandler = async (req,res,next) =>{
    const obtstatus:Status [] = await Status.findAll();
    return res.status(200).json({message: "status obtenidos", data:obtstatus});   
}