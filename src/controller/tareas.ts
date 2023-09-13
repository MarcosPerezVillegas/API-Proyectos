import { RequestHandler } from "express";
import { Tarea } from "../models/tareas";
import { Proyecto } from "../models/proyectos";
import { Op, where } from "sequelize";
import fs from 'fs'
import path from "path";
import { rimraf } from "rimraf";

export const addtarea: RequestHandler = async (req, res, next) => {
    try {
        const id = req.body.Proyecto_id
        const proyecto: Proyecto | null = await Proyecto.findByPk(id)
        if (!proyecto) {
            return res.status(402).json({ message: "No se encontro proyecto para esta tarea" });
        }
        const dir = path.resolve(__dirname,'..')
        const carpeta = path.join(dir,'Archivos', id)

        if(!fs.existsSync(carpeta)){
            fs.mkdirSync(carpeta)
        }
        var tarea = await Tarea.create({ ...req.body });
        const carpetaMat =path.join(dir,'Archivos',id,tarea.id.toString()+'-Material')
        if(!fs.existsSync(carpetaMat)){
            fs.mkdirSync(carpetaMat)
        }
        if (!tarea) {
            return res.status(401).json({ message: "No se pudo crear la tarea" });
        }
        return res.status(200).json({ message: "Tarea creada", data: tarea });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const droptarea: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        const tareaeliminada: Tarea | null = await Tarea.findByPk(id);
        await Tarea.destroy({ where: { id } });
        if (!tareaeliminada) {
            return res.status(401).json({ message: "No se pudo eliminar la tarea" });
        }
        const dir = path.resolve(__dirname,'..')
        const carpeta = path.join(dir,'Archivos',tareaeliminada.Proyecto_id.toString())

        let archivos = fs.readdirSync(carpeta);

        archivos = archivos.filter((archivo) => archivo.includes(id));

        archivos.forEach((archivo) => {
            const rutaArchivo = path.join(carpeta, archivo);
            if (fs.statSync(rutaArchivo).isFile()) {
                // Si es un archivo, eliminarlo
                fs.unlinkSync(rutaArchivo);
            } else {
                // Si es una carpeta, eliminarla de manera recursiva
                rimraf.sync(rutaArchivo);
            }
        });
        
        return res.status(200).json({ message: "Tarea eliminada", data: tareaeliminada });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const obttarea: RequestHandler = async (req, res, next) => {
    try {
        const obttarea: Tarea[] = await Tarea.findAll({include: Proyecto});
        if (!obttarea) {
            return res.status(401).json({ message: "No se pudo encontrar las tareas" });
        }
        return res.status(200).json({ message: "Tareas obtenidas", data: obttarea });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const obttareaid: RequestHandler = async (req, res, next) => {
    const { id } = req.params
    try {
        const obttarea: Tarea | null = await Tarea.findByPk(id);
        if (!obttarea) {
            return res.status(401).json({ message: "No se pudo encontrar la tarea" });
        }
        return res.status(200).json({ message: "tarea obtenida", data: obttarea });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}
/*
export const obttareanombre: RequestHandler = async (req, res, next) => {
    const { nombre } = req.params
    try {
        const obttarea: Tarea[] = await Tarea.findAll({where: {nombre}});
        if (!obttarea) {
            return res.status(401).json({ message: "No se pudo encontrar la tarea" });
        }
        return res.status(200).json({ message: "tarea obtenida", data: obttarea });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}*/

export const obttareapro: RequestHandler = async (req, res, next) => {
    const { Proyecto_id } = req.params
    try {
        const obttarea: Tarea[] = await Tarea.findAll({where: { Proyecto_id }, include: Proyecto});
        if (!obttarea) {
            return res.status(401).json({ message: "No se pudo encontrar la tarea" });
        }
        return res.status(200).json({ message: "tarea obtenida", data: obttarea });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}


export const updtarea: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const tareaActualizada: Tarea | null = await Tarea.findByPk(id);
        await Tarea.update({ ...req.body }, { where: { id } });
        if (!tareaActualizada) {
            return res.status(401).json({ message: "No se pudo actualizar la tarea" });
        }
        return res.status(200).json({ message: "Tarea actualizada!", tareaActualizada });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}