import { RequestHandler } from "express";

import { Carrera } from "../models/carrera";
import { Proyecto } from "../models/proyectos";

export const crearCarrera: RequestHandler = async (req,res)=>{
    var carrera = await Carrera.create({...req.body});
    return res.status(200).json({message:"Carrera creada ok!",data:carrera});
}

export const borrarCarrera:RequestHandler =async (req,res) => {
    const {clave} = req.params;
    const carreraEliminada: Carrera|null = await Carrera.findByPk(clave);
    await Carrera.destroy({where:{clave}});
    return res.status(200).json({messege:"Carrera borrado ok!", data:carreraEliminada})
}

export const obtenerTCarreras:RequestHandler =async (req,res)=>{
    const todosLasCarreras: Carrera[] = await Carrera.findAll({
        include: Proyecto
    });
    return res.status(200).json({message:"Carrera obtenidos ok!",data:todosLasCarreras});
}

export const obtenerCarreraClave:RequestHandler =async (req,res) => {
    const {clave} = req.params
    const carreraActualizado:Carrera|null = await Carrera.findByPk(clave);
    if(!carreraActualizado){
        return res.status(401).json({message:"Carrera no encontrada"});
    }
    return res.status(200).json({message:"Carrera encontrada!",data:carreraActualizado});
}

export const actualizarCarrera: RequestHandler = async (req,res) => {
  const {clave} = req.params;
  const carreraActualizada: Carrera | null = await Carrera.findByPk(clave);
  var carrera = await Carrera.update({...req.body}, {where:{clave}});
  return res.status(200).json({message:"Carrera actualizada!",carreraActualizada});
} 