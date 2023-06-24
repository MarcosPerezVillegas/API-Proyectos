import { RequestHandler } from "express";
import { Maestros } from "../models/maestros";
import { Op } from "sequelize";
import bcrypt from 'bcrypt';

export const crearMaestro: RequestHandler = async (req, res) => {
    try {
        var maestro = await Maestros.create({/*...req.body});*/
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),//cuando creamos el maestro, hasheamos el password con bcrypt
            telefono: req.body.telefono,
            rol_id: req.body.rol_id
        });
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo crear al maestro", data: maestro });
        }
        return res.status(200).json({ message: "maestro creado", data: maestro });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarMaestros: RequestHandler = async (req, res) => {
    try {
        var maestros = await Maestros.findAll({
            attributes: { exclude: ["password"] }
        });
        if (!maestros) {
            return res.status(401).json({ message: "No se pudo encontar los maestros", data: maestros });
        }
        return res.status(200).json({ message: "maestros encontrados: " + maestros.length, data: maestros });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarMaestrosElimidanos: RequestHandler = async (req, res) => {
    try {
        var maestros = await Maestros.findAll({
            where: {
                deletedAt: {[Op.not]: null}
            },
            paranoid: false,
            attributes: { exclude: ["password"] }
        });
        if (!maestros) {
            return res.status(401).json({ message: "No se pudo encontar los maestros", data: maestros });
        }
        return res.status(200).json({ message: "maestros encontrados: " + maestros.length, data: maestros });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const infoCompletaMaestro: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var maestro = await Maestros.findByPk(codigo);
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al maestro", data: maestro });
        }
        return res.status(200).json({ message: "maestro encontrado con toda su info", data: maestro });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

/*export const buscarmaestroNombre: RequestHandler = async (req, res) => {
    const { nombre } = req.params
    try {
        console.log(nombre)
        var maestro = await Maestros.findOne({where: {nombre},
            include: Rol,
            attributes: { exclude: ["rol_id"] }
        });
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al maestro", data: maestro });
        }
        return res.status(200).json({ message: "maestro encontrado con toda su info", data: maestro });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}*/

export const infoemailMaestro: RequestHandler = async (req, res) => {
    const { email } = req.params
    try {
        var maestro: Maestros | null = await Maestros.findOne({where: { email}, attributes: {exclude: ['password','telefono']}});
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al maestro", data: maestro });
        }
        return res.status(200).json({ message: "maestro encontrado con toda su info", data: maestro });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const infoCompletaMaestroEliminado: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var maestro = await Maestros.findByPk(codigo, {paranoid: false,});
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al maestro", data: maestro });
        }
        return res.status(200).json({ message: "maestro encontrado con toda su info", data: maestro });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const actualizarMaestro: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        const maestroActualizado: Maestros | null = await Maestros.findByPk(codigo);
        var maestro = await Maestros.update({ ...req.body }, { where: { codigo: codigo } });
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo actualizar el maestro", data: maestro });
        }
        return res.status(200).json({ message: "maestro actualizado", data: maestroActualizado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const eliminarMaestro: RequestHandler = async (req, res) => {
    const { codigo } = req.params;
    try {
        const maestroEliminado: Maestros | null = await Maestros.findByPk(codigo);
        var maestro = await Maestros.destroy({ where: { codigo } });
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo eliminar el maestro", data: maestro });
        }
        return res.status(200).json({ message: "maestro eliminado", data: maestroEliminado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const eliminarMaestroPerma: RequestHandler = async (req, res) => {
    const { codigo } = req.params;
    try {
        const maestroEliminado: Maestros | null = await Maestros.findByPk(codigo);
        var maestro = await Maestros.destroy({ where: { codigo}, force: true });
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo eliminar el maestro", data: maestro });
        }
        return res.status(200).json({ message: "maestro eliminado", data: maestroEliminado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}
export const restaurarMaestro: RequestHandler = async (req, res) => {
    const { codigo } = req.params;
    try {
        const maestroaRestaurar: Maestros | null = await Maestros.findByPk(codigo, { paranoid: false });
        var maestro = await maestroaRestaurar?.restore();
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo recuperar el maestro", data: maestro });
        }
        return res.status(200).json({ message: "Se restauró un maestro", data: maestroaRestaurar });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}