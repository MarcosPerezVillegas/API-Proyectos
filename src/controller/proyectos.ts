import { RequestHandler } from "express";
import { Proyecto } from "../models/proyectos";
//import { Usuario } from "../models/maestros";
import { Carrera } from "../models/carrera";
import { connection } from "../db/config"
import { Model } from "sequelize";
import { Status } from "../models/status";
import { statusProyecto } from "../models/statusProyecto";
import { Alumnos } from "../models/alumnos";
import { Maestros } from "../models/maestros";

export const crearProyecto: RequestHandler = async (req, res) => {
    try {
        const proyecto = await Proyecto.create({ ...req.body });

        // Buscar el estado con ID 1 en la tabla Status
        const estado = await Status.findByPk(1);
        if (!estado) {
            return res.status(404).json({ message: "No se encontró el estado inicial" });
        }

        // Asociar el estado al proyecto creado
        await proyecto.$add('statuses', estado);

        return res.status(200).json({ message: "Proyecto creado!", data: proyecto });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }
}

export const listarProyectos: RequestHandler = async (req, res) => {
    try {
        var proyectos = await Proyecto.findAll({
            include: [
                Alumnos,
                {model: Maestros,
                    attributes: { exclude: ["password", "telefono"]}
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
        const proyecto: Proyecto | null = await Proyecto.findByPk(id);
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
            ],
            attributes: { exclude: [ "carrera_clave"] },
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

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

}

export const actualizarProyecto: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
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
    //const proyecto_id=id;
    try {
       /* console.log(proyecto_id)
        const statusEliminado: Status | null = await Status.findOne({
            where: {proyecto_id},
        });
        if (!statusEliminado) {
            return res.status(401).json({ message: "No se pudo eliminar el status ligado al proyecto" });
        }
        await Status.destroy({ where: { proyecto_id } });*/
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
