import { RequestHandler } from "express";
import { Tarea } from "../models/tareas";

export const addtarea: RequestHandler = async (req, res, next) => {
    try {
        var tarea = await Tarea.create({ ...req.body });
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
        return res.status(200).json({ message: "Tarea eliminada", data: tareaeliminada });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const obttarea: RequestHandler = async (req, res, next) => {
    try {
        const obttarea: Tarea[] = await Tarea.findAll();
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