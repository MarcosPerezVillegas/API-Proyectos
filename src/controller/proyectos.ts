import { RequestHandler } from "express";
import { Proyecto } from "../models/proyectos";
import {Op, STRING} from "sequelize";
import bcrypt from 'bcrypt';
import { Usuario } from "../models/usuarios";
import { Carrera } from "../models/carrera";

export const crearProyecto:RequestHandler =async (req,res) => {
    var proyecto = await Proyecto.create({...req.body});
    return res.status(200).json({message:"Proyecto creado!", data:proyecto});
}

export const listarProyectos:RequestHandler =async (req,res) => {
    var proyectos = await Proyecto.findAll({
        attributes: {exclude:["usuario_codigo"]},
    });
    return res.status(200).json({message:"Proyectos encontrados: "+proyectos.length, data:proyectos});
}

export const BuscarProyectoId:RequestHandler =async (req,res) => {
    const {id} = req.params
    const proyecto:Proyecto|null = await Proyecto.findByPk(id,{
        include: [
            {
                model: Usuario,
                attributes: {exclude:["password"]},
            },
            Carrera,
        ],
        attributes: {exclude:["usuario_codigo","carrera_clave"]},
    });
    return res.status(200).json({message:"Proyecto encontrado por ID",data:proyecto});
}

export const BuscarProyectoNombre:RequestHandler =async (req,res) => {
    const {nombrep} = req.params
    const proyecto:Proyecto|null = await Proyecto.findOne({
        where: {nombrep},
        include: [
            {
                model: Usuario,
                attributes: {exclude:["password"]},
            },
            Carrera,
        ],
        attributes: {exclude:["usuario_codigo","carrera_clave"]},
    });
    return res.status(200).json({message:"Proyecto encontrado",data:proyecto});
}

export const BuscarProyectoUsuario:RequestHandler =async (req,res) => {
    const {usuario_codigo} = req.params
    const proyecto:Proyecto|null = await Proyecto.findOne({
        where: {usuario_codigo},
        include: [
            {
                model: Usuario,
                attributes: {exclude:["password"]},
            },
            Carrera,
        ],
        attributes: {exclude:["usuario_codigo","carrera_clave"]},
    });
    return res.status(200).json({message:"Proyecto encontrado",data:proyecto});
}

export const BuscarProyectosCarrera:RequestHandler =async (req,res) => {
    const {carrera_clave} = req.params
    const proyecto:Proyecto[] = await Proyecto.findAll({
        where: {carrera_clave},
        include: [
            {
                model: Usuario,
                attributes: {exclude:["password"]},
            },
            Carrera,
        ],
        attributes: {exclude:["usuario_codigo","carrera_clave"]},
    });
    return res.status(200).json({message:"Proyectos encontrados",data:proyecto});
}

export const actualizarProyecto:RequestHandler =async (req,res) => {
    const {id} = req.params;
    const proyectoActualizado:Proyecto|null = await Proyecto.findByPk(id);
    var proyecto = await Proyecto.update({...req.body},{where:{id}});
    return res.status(200).json({message:"Proyecto actualizado", data:proyectoActualizado});
}

export const eliminarProyecto:RequestHandler =async (req,res) => {
    const {id} = req.params;
    const proyectoEliminado:Proyecto|null = await Proyecto.findByPk(id,{
        include: [
            {
                model: Usuario,
                attributes: {exclude:["password"]},
            },
            Carrera,
        ],
        attributes: {exclude:["usuario_codigo","carrera_clave"]},
    });
    await Proyecto.destroy({where:{id}});
    return res.status(200).json({message:"Proyecto eliminado",data:proyectoEliminado});    
}
