import { RequestHandler } from "express";
import {Status} from "../models/status";
import { Proyecto } from "../models/proyectos";
import { where } from "sequelize";

export const addstat:RequestHandler = async (req,res,next) =>{
    var stat = await Status.create({...req.body});
    if(!stat){
        return res.status(401).json({ message: "No se pudo crear el status"});
    }
    return res.status(200).json({message: "status creado", data:stat});
}

export const dropstat:RequestHandler = async (req,res,next) =>{
    const {proyecto_id} = req.params;
    const stateliminado: Status|null = await Status.findByPk(proyecto_id);
    var stat = await Status.destroy({where:{proyecto_id}});
    if(!stat){
        return res.status(401).json({ message: "No se pudo eliminar el status"});
    }
    return res.status(200).json({message: "status eliminado", data:stateliminado});
}

export const obtstat:RequestHandler = async (req,res,next) =>{
    const obtstatus:Status [] = await Status.findAll();
    if(!obtstat){
        return res.status(401).json({ message: "No se pudo encontrar el status"});
    }
    return res.status(200).json({message: "status obtenidos", data:obtstatus});   
}

export const BuscarProyecto:RequestHandler =async (req,res) => {
    const {Proyecto_id} = req.params;
    const proyecto : Status | null = await Status.findOne({
        where:{Proyecto_id},
        include: Proyecto,
        attributes: {exclude: ["Proyecto_id"]}
    });
    if(!proyecto){
        return res.status(401).json({ message: "No se pudo encontrar el documento"});
    }
    return res.status(200).json({message:"Proyecto encontrado",data:proyecto});
}

export const updstat: RequestHandler = async (req, res) => {
    const { Proyecto_id } = req.params;
    const statActualizado: Status | null = await Status.findOne({where: {Proyecto_id}});
    var stat = await Status.update({ ...req.body }, { where: { Proyecto_id } });
    if(!stat){
        return res.status(401).json({ message: "No se pudo actualizar el status"});
    }
    return res.status(200).json({ message: "Status actualizado!", statActualizado });
}