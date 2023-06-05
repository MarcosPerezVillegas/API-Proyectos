import { RequestHandler } from "express";

import {Rol} from "../models/roles";
import { Usuario } from "../models/usuarios";

export const crearRol: RequestHandler = async (req,res)=>{
    var rol = await Rol.create({...req.body});
    if(!rol){
        return res.status(401).json({message:"No se pudo crear el rol",data:rol});
    }
    return res.status(200).json({message:"Rol creado ok!",data:rol});
}

export const borrarRol:RequestHandler =async (req,res) => {
    const {id} = req.params;
    const rolEliminado: Rol|null = await Rol.findByPk(id);
    await Rol.destroy({where:{id}});
    if(!rolEliminado){
        return res.status(401).json({message:"No se pudo eliminar el rol",data:rolEliminado});
    }
    return res.status(200).json({messege:"Rol Eliminado ok!", data:rolEliminado})
}

export const obtenerTRoles:RequestHandler =async (req,res)=>{
    const todosLosRoles: Rol[] = await Rol.findAll();
    if(!todosLosRoles){
        return res.status(401).json({message:"No se pudo obtener los roles",data:todosLosRoles});
    }
    return res.status(200).json({message:"Roles obtenidos ok!",data:todosLosRoles});
}

export const obtenerRolId:RequestHandler =async (req,res)=>{
    const {id} = req.params;
    const rolId: Rol|null = await Rol.findByPk(id,{
        include: {
            model: Usuario,
            attributes: {exclude:["password"]},
        },
    });
    if(!rolId){
        return res.status(401).json({message:"No se pudo obtener el rol",data:rolId});
    }
    return res.status(200).json({message:"Rol obtenido ok!",data:rolId});
}

export const actualizarRol: RequestHandler = async (req,res) => {
    const {id} = req.params;
    await Rol.update({...req.body}, {where:{id}});
    const rolActualizado: Rol | null = await Rol.findByPk(id);
    if(!rolActualizado!){
        return res.status(401).json({message:"No se pudo actualizar el rol",data:rolActualizado});
    }
    return res.status(200).json({message:"Rol actualizado!",data:rolActualizado});
} 