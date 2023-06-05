import { RequestHandler } from "express";

import { Carrera } from "../models/carrera";
import { Proyecto } from "../models/proyectos";

export const crearCarrera: RequestHandler = async (req,res)=>{
    var carrera = await Carrera.create({...req.body});
    if(!carrera){
        return res.status(401).json({message:"No se pudo crear la tarea"});
    }
    return res.status(200).json({message:"Carrera creada ok!",data:carrera});
}

export const borrarCarrera:RequestHandler =async (req,res) => {
    const {clave} = req.params;
    const carreraEliminada: Carrera|null = await Carrera.findByPk(clave);
    var carrera = await Carrera.destroy({where:{clave}});
    if(!carrera){
        return res.status(401).json({message:"No se pudo eliminar la tarea"});
    }
    return res.status(200).json({messege:"Carrera eliminada ok!", data:carreraEliminada})
}

export const obtenerTCarreras:RequestHandler =async (req,res)=>{
    const todosLasCarreras: Carrera[] = await Carrera.findAll();
    if(!todosLasCarreras){
        return res.status(401).json({message:"No se pudo obtener las carreras"});
    }
    return res.status(200).json({message:"Carrera obtenidos ok!",data:todosLasCarreras});
}

export const obtenerCarreraClave:RequestHandler =async (req,res) => {
    const {clave} = req.params
    const carreraClave:Carrera|null = await Carrera.findByPk(clave,{
        include: [
            {
              model: Proyecto,
              attributes: {exclude:["usuario_codigo"]},
            },
          ],
    });
    if(!carreraClave){
        return res.status(401).json({message:"No se pudo encontrar la carrera"});
    }
    return res.status(200).json({message:"Carrera encontrada!",data:carreraClave});
}

export const obtenerCarreraNombre:RequestHandler =async (req,res) => {
    const {nombre} = req.params
    const CarreraNombre:Carrera|null = await Carrera.findOne(
        {where: {nombre},
        include: [
            {
              model: Proyecto,
              attributes: {exclude:["usuario_codigo"]},
            },
          ],
        });
    if(!CarreraNombre){
        return res.status(401).json({message:"No se pudo encontrar la carrera"});
    }
    return res.status(200).json({message:"Carrera encontrada!",data:CarreraNombre});
}

export const actualizarCarrera: RequestHandler = async (req,res) => {
  const {clave} = req.params;
  const carreraActualizada: Carrera | null = await Carrera.findByPk(clave);
  var carrera = await Carrera.update({...req.body}, {where:{clave}});
  if(!carrera){
    return res.status(401).json({message:"No se pudo actualizar la carrera"});
}
  return res.status(200).json({message:"Carrera actualizada!",carreraActualizada});
} 