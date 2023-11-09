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
import path from "path";
import { rimraf } from "rimraf";
import fs from 'fs'
import { Tarea } from "../models/tareas";

export const crearProyecto: RequestHandler = async (req, res) => {
    try {
        const proyecto = await Proyecto.create({ ...req.body });
        // Buscar el estado con ID 1 en la tabla Status
        let estado = await Status.findByPk(1);
        if (!estado) {
            estado = await Status.create(
                {
                    id: 1,
                    Estado: "En espera"
                }
            )
            const estado1 = await Status.create(
                {
                    id: 2,
                    Estado: "Activo"
                }
            )
            const estado2 = await Status.create(
                {
                    id: 3,
                    Estado: "Terminado"
                }
            )
            // Asociar el estado al proyecto creado
        }

        const dir = path.resolve(__dirname,'..')
            const carpeta = path.join(dir,'Archivos', `${proyecto.id}`)
            const carpetaP = path.join(dir,'Archivos', `${proyecto.id}`,'Propuesta')
            if(!fs.existsSync(carpeta)){
                fs.mkdirSync(carpeta)
            }
            if(!fs.existsSync(carpetaP)){
                fs.mkdirSync(carpetaP)
            }
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
            include: [
                {
                    model: Maestros,
                    attributes: { exclude: ["password", "telefono"] }
                },
                Carrera,
                {
                    model: Alumnos,
                    attributes: { exclude: ["password", "telefono"] }
                },
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
    const { dele } = req.body
    try {
        if (status_id) {
            let status: Status | null = await Status.findOne({ where: { id: status_id } });
            const proyecto: Proyecto | null = await Proyecto.findByPk(id);
            if (proyecto) {
                const term: statusProyecto | null = await statusProyecto.findOne({ where: { proyecto_id: id, status_id: 3 } });
                let estatus: statusProyecto | null = await statusProyecto.findOne({ where: { proyecto_id: id, status_id } });
                if (term && !dele) {
                    return res.status(404).json({ message: "No puedes agregar mas estados a un proyecto terminado" });
                }
                if (term && status_id !== 3) {
                    return res.status(404).json({ message: "No puedes quitar estados de un proyecto terminado" });
                }
                if (estatus) {
                    if (dele) {
                        let stat: Status | null = await Status.findOne({ where: { id: status_id } });
                        await proyecto.$remove('statuses', stat!);
                        await statusProyecto.destroy({ where: { id: estatus.id }, force: true })
                        return res.status(200).json({ message: "Se eliminó el estado del registro del proyecto con exito" });
                    }
                    return res.status(403).json({ message: "Este proyecto ya cuenta con este estado" });
                }
                await proyecto.$add('statuses', status!);
                await statusProyecto.update({ nota }, { where: { proyecto_id: id, status_id } })
            }
        }
        const proyectoActualizado: Proyecto | null = await Proyecto.findByPk(id);
        var proyecto = await Proyecto.update({ ...req.body }, { where: { id } });
        if (!proyecto) {
            return res.status(404).json({ message: "No se pudo actualizar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto actualizado", data: proyectoActualizado });
    } catch (error) {
        return res.status(400).json({ message: "", error });
    }

}

export const eliminarProyecto: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const proyectoEliminado: Proyecto | null = await Proyecto.findByPk(id);
        if (!proyectoEliminado) {
            return res.status(500).json({ message: "No se pudo eliminar el proyecto" });
        }
        const tareas: Tarea[] = await Tarea.findAll({ where: { Proyecto_id: id } });
        for (const tarea of tareas) {
            await tarea.destroy();
        }
        await Proyecto.destroy({ where: { id } });
        const dir = path.resolve(__dirname, '..')
        const carpeta = path.join(dir, 'Archivos')
        const ruta = path.join(carpeta, proyectoEliminado.id.toString());
        try {
            fs.readdirSync(ruta)
            rimraf.sync(ruta);
        } catch { }
        return res.status(200).json({ message: "Proyecto eliminado", data: proyectoEliminado });
    } catch (error) {
        return res.status(404).json({ message: error });
    }

}
