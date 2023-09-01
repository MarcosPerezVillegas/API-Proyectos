import { RequestHandler } from "express";
import { Status } from "../models/status";
import { Proyecto } from "../models/proyectos";
import { statusProyecto } from "../models/statusProyecto";

export const addstat: RequestHandler = async (req, res, next) => {
    try {
        var stat = await Status.create({ ...req.body });
        if (!stat) {
            return res.status(401).json({ message: "No se pudo crear el status" });
        }
        return res.status(200).json({ message: "status creado", data: stat });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const dropstat: RequestHandler = async (req, res, next) => {
    const { proyecto_id } = req.params;
    try {
        const stateliminado: Status | null = await Status.findByPk(proyecto_id);
        var stat = await Status.destroy({ where: { proyecto_id } });
        if (!stat) {
            return res.status(401).json({ message: "No se pudo eliminar el status" });
        }
        return res.status(200).json({ message: "status eliminado", data: stateliminado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const obtstat: RequestHandler = async (req, res, next) => {
    try {
        const obtstatus: Status[] = await Status.findAll();
        if (!obtstat) {
            return res.status(401).json({ message: "No se pudo encontrar el status" });
        }
        return res.status(200).json({ message: "status obtenidos", data: obtstatus });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const BuscarProyecto: RequestHandler = async (req, res) => {
    const { Proyecto_id } = req.params;
    try {
        const proyecto: Status | null = await Status.findOne({
            where: { Proyecto_id },
            include: Proyecto,
            attributes: { exclude: ["Proyecto_id"] }
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el documento" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const updstat: RequestHandler = async (req, res) => {
    const { Proyecto_id } = req.params;
    try {
        const statActualizado: Status | null = await Status.findOne({ where: { Proyecto_id } });
        var stat = await Status.update({ ...req.body }, { where: { Proyecto_id } });
        if (!stat) {
            return res.status(401).json({ message: "No se pudo actualizar el status" });
        }
        return res.status(200).json({ message: "Status actualizado!", statActualizado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const BuscarStatus: RequestHandler = async (req, res) => {
    const { Estado } = req.params;
    try {
        const status: Status | null = await Status.findOne({
            where: { Estado },
        });
        if (!status) {
            return res.status(401).json({ message: "No se pudo encontrar el estado" });
        }
        return res.status(200).json({ message: "Estado encontrado", data: status });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}