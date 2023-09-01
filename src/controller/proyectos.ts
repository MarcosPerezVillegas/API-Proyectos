import { RequestHandler } from "express";
import { Proyecto } from "../models/proyectos";
//import { Usuario } from "../models/maestros";
import { Carrera } from "../models/carrera";
import { connection } from "../db/config"
import { Model, where } from "sequelize";
import { Status } from "../models/status";
import { statusProyecto } from "../models/statusProyecto";
import { Alumnos } from "../models/alumnos";
import { Maestros } from "../models/maestros";
import { UpdatedAt } from "sequelize-typescript";

export const crearProyecto: RequestHandler = async (req, res) => {
    try {
        const proyecto = await Proyecto.create({ ...req.body });
        const { id } = req.body

        // Buscar el estado con ID 1 en la tabla Status
        let estado = await Status.findByPk(1);
        if (!estado) {
            estado = await Status.create(
                {
                    id: 1,
                    Estado: "Activo"
                }
            )
        }

        // Asociar el estado al proyecto creado
        await proyecto.$add('statuses', estado);
        //await statusProyecto.findOne({where: {proyecto_id : proyecto.id}});
        await statusProyecto.update({ nota: "Proyecto creado" }, { where: { proyecto_id: proyecto.id } })

        return res.status(200).json({ message: "Proyecto creado!", data: proyecto });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }
}

export const listarProyectos: RequestHandler = async (req, res) => {
    try {
        var proyectos = await Proyecto.findAll({
            include: [
                {
                    model: Alumnos,
                    attributes: { exclude: ["password", "telefono"] }
                },
                {
                    model: Maestros,
                    attributes: { exclude: ["password", "telefono"] }
                },
                Carrera,
                Status,
            ],
            attributes: { exclude: ["carrera_clave", "codigo"] },
        });
        if (!proyectos) {
            return res.status(401).json({ message: "No se pudo encontrar los proyectos" });
        }
        return res.status(200).json({ message: "Proyectos encontrados: " + proyectos.length, data: proyectos });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const BuscarProyectoId: RequestHandler = async (req, res) => {
    const { id } = req.params
    try {
        const proyecto: Proyecto | null = await Proyecto.findByPk(id, {
            include: [Maestros,
                Carrera,
                Alumnos,
                { model: Status },],
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const BuscarProyectoNombre: RequestHandler = async (req, res) => {
    const { nombre } = req.params
    try {
        const proyecto: Proyecto | null = await Proyecto.findOne({
            where: { nombre: nombre },
            include: [
            ],
            attributes: { exclude: ["codigo", "carrera_clave"] },
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const BuscarProyectoUsuario: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        const proyecto: Proyecto[] = await Proyecto.findAll({
            where: { codigo },
            include: [
                Carrera,
                { model: Status },
            ],
            attributes: { exclude: ["carrera_clave"] },
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}
/*
export const BuscarProyectosCarrera: RequestHandler = async (req, res) => {
    const { carrera_clave } = req.params
    try {
        const proyecto: Proyecto[] = await Proyecto.findAll({
            where: { carrera_clave },
            include: [
                {
                    //model: Usuario,
                    attributes: { exclude: ["password"] },
                },
                Carrera,
            ],
            attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyectos encontrados", data: proyecto });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}*/

export const actualizarProyecto: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { status_id } = req.body
    const { nota } = req.body
    try {
        if (status_id) {
            let status: Status | null = await Status.findOne({ where: { id: status_id } });
            const proyecto: Proyecto | null = await Proyecto.findByPk(id);
            if (proyecto) {
                let estatus: statusProyecto | null = await statusProyecto.findOne({ where: { proyecto_id: id, status_id } });
                if(estatus){
                    return res.status(401).json({ message: "Este proyecto ya cuenta con este estado" });
                }
                await proyecto.$add('statuses', status!);
                await statusProyecto.update({ nota }, { where: { proyecto_id: id } })
            }
        }
        const proyectoActualizado: Proyecto | null = await Proyecto.findByPk(id);
        var proyecto = await Proyecto.update({ ...req.body }, { where: { id } });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo actualizar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto actualizado", data: proyectoActualizado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const eliminarProyecto: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const proyectoEliminado: Proyecto | null = await Proyecto.findByPk(id);
        if (!proyectoEliminado) {
            return res.status(401).json({ message: "No se pudo eliminar el proyecto" });
        }
        await Proyecto.destroy({ where: { id } });
        return res.status(200).json({ message: "Proyecto eliminado", data: proyectoEliminado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}
