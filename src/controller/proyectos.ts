import { RequestHandler } from "express";
import { Proyecto } from "../models/proyectos";
import { Usuario } from "../models/usuarios";
import { Carrera } from "../models/carrera";
import { connection } from "../db/config"

export const crearProyecto: RequestHandler = async (req, res) => {
    try {
        var proyecto = await Proyecto.create({ ...req.body });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo crear el proyecto" });
        }
        var id = req.body.id
        var status = await connection.query("INSERT INTO `status`(`proyecto_id`, `estado`) VALUES ('" + id + "','Disponible')")
        if (!status) {
            return res.status(401).json({ message: "No se pudo asignar un estado al proyecto" });
        }
        return res.status(200).json({ message: "Proyecto creado!", data: proyecto });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarProyectos: RequestHandler = async (req, res) => {
    try {
        var proyectos = await Proyecto.findAll({
            attributes: { exclude: ["usuario_codigo"] },
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
                    model: Usuario,
                    attributes: { exclude: ["password"] },
                },
                Carrera,
            ],
            attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
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
    const { nombrep } = req.params
    try {
        const proyecto: Proyecto | null = await Proyecto.findOne({
            where: { nombrep },
            include: [
                {
                    model: Usuario,
                    attributes: { exclude: ["password"] },
                },
                Carrera,
            ],
            attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
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
    const { usuario_codigo } = req.params
    try {
        const proyecto: Proyecto | null = await Proyecto.findOne({
            where: { usuario_codigo },
            include: [
                {
                    model: Usuario,
                    attributes: { exclude: ["password"] },
                },
                Carrera,
            ],
            attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
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
                    model: Usuario,
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
    try {
        const proyectoEliminado: Proyecto | null = await Proyecto.findByPk(id, {
            include: [
                {
                    model: Usuario,
                    attributes: { exclude: ["password"] },
                },
                Carrera,
            ],
            attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
        });
        if (!proyectoEliminado) {
            return res.status(401).json({ message: "No se pudo eliminar el proyecto" });
        }
        await Proyecto.destroy({ where: { id } });
        return res.status(200).json({ message: "Proyecto eliminado", data: proyectoEliminado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}
