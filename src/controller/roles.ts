import { RequestHandler } from "express";

import {Rol} from "../models/roles";
import { Usuario } from "../models/usuarios";

export const crearRol: RequestHandler = async (req,res)=>{
    var rol = await Rol.create({...req.body});
    return res.status(200).json({message:"Rol creado ok!",data:rol});
}

export const borrarRol:RequestHandler =async (req,res) => {
    const {id} = req.params;
    const rolEliminado: Rol|null = await Rol.findByPk(id);
    await Rol.destroy({where:{id}});
    return res.status(200).json({messege:"Rol borrado ok!", data:rolEliminado})
}

export const obtenerTRoles:RequestHandler =async (req,res)=>{
    const todosLosRoles: Rol[] = await Rol.findAll({
        include: Usuario,
        attributes: {exclude:["password"]}
    });
    return res.status(200).json({message:"Roles obtenidos ok!",data:todosLosRoles});
}

export const actualizarRol: RequestHandler = async (req,res) => {
  const {id} = req.params;
  await Rol.update({...req.body}, {where:{id}});
  const rolActualizado: Rol | null = await Rol.findByPk(id);
  return res.status(200).json({message:"Rol actualizado!",data:rolActualizado});
} 