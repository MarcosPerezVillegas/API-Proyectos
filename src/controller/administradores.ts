import { RequestHandler } from "express";
import { Administradores } from "../models/administradores";
import { Op } from "sequelize";
import bcrypt from 'bcrypt';

export const crearAdministrador: RequestHandler = async (req, res) => {
    try {
        var administrador = await Administradores.create({/*...req.body});*/
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),//cuando creamos el administrador, hasheamos el password con bcrypt
            telefono: req.body.telefono,
            rol_id: req.body.rol_id
        });
        if (!administrador) {
            return res.status(401).json({ message: "No se pudo crear al administrador", data: administrador });
        }
        return res.status(200).json({ message: "Administrador creado", data: administrador });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarAdministradores: RequestHandler = async (req, res) => {
    try {
        var administradores = await Administradores.findAll({
            attributes: { exclude: ["password"] }
        });
        if (!administradores) {
            return res.status(401).json({ message: "No se pudo encontar los administradores", data: administradores });
        }
        return res.status(200).json({ message: "Administradores encontrados: " + administradores.length, data: administradores });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarAdministradoresElimidanos: RequestHandler = async (req, res) => {
    try {
        var administradores = await Administradores.findAll({
            where: {
                deletedAt: {[Op.not]: null}
            },
            paranoid: false,
            attributes: { exclude: ["password"] }
        });
        if (!administradores) {
            return res.status(401).json({ message: "No se pudo encontar los administradores", data: administradores });
        }
        return res.status(200).json({ message: "Administradores encontrados: " + Administradores.length, data: administradores });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const infoCompletaAdministrador: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var administrador = await Administradores.findByPk(codigo);
        if (!administrador) {
            return res.status(401).json({ message: "No se pudo encontar al administrador", data: administrador });
        }
        return res.status(200).json({ message: "Administrador encontrado con toda su info", data: administrador });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

/*export const buscaradministradorNombre: RequestHandler = async (req, res) => {
    const { nombre } = req.params
    try {
        console.log(nombre)
        var administrador = await Administradores.findOne({where: {nombre},
            include: Rol,
            attributes: { exclude: ["rol_id"] }
        });
        if (!administrador) {
            return res.status(401).json({ message: "No se pudo encontar al administrador", data: administrador });
        }
        return res.status(200).json({ message: "administrador encontrado con toda su info", data: administrador });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}*/

export const infoemailAdministrador: RequestHandler = async (req, res) => {
    const { email } = req.params
    try {
        var administrador: Administradores | null = await Administradores.findOne({where: { email}, attributes: {exclude: ['password','telefono']}});
        if (!administrador) {
            return res.status(401).json({ message: "No se pudo encontar al administrador", data: administrador });
        }
        return res.status(200).json({ message: "Administrador encontrado con toda su info", data: administrador });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const infoCompletaAdministradorEliminado: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var administrador = await Administradores.findByPk(codigo, {paranoid: false,});
        if (!administrador) {
            return res.status(401).json({ message: "No se pudo encontar al administrador", data: administrador });
        }
        return res.status(200).json({ message: "Administrador encontrado con toda su info", data: administrador });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const actualizarAdministrador: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        const administradorActualizado: Administradores | null = await Administradores.findByPk(codigo);
        var administrador = await Administradores.update({ ...req.body }, { where: { codigo: codigo } });
        if (!administrador) {
            return res.status(401).json({ message: "No se pudo actualizar el administrador", data: administrador });
        }
        return res.status(200).json({ message: "Administrador actualizado", data: administradorActualizado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const eliminarAdministrador: RequestHandler = async (req, res) => {
    const { codigo } = req.params;
    try {
        const administradorEliminado: Administradores | null = await Administradores.findByPk(codigo);
        var administrador = await Administradores.destroy({ where: { codigo } });
        if (!administrador) {
            return res.status(401).json({ message: "No se pudo eliminar el administrador", data: administrador });
        }
        return res.status(200).json({ message: "Administrador eliminado", data: administradorEliminado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const eliminarAdministradorPerma: RequestHandler = async (req, res) => {
    const { codigo } = req.params;
    try {
        const administradorEliminado: Administradores | null = await Administradores.findByPk(codigo);
        var administrador = await Administradores.destroy({ where: { codigo}, force: true });
        if (!administrador) {
            return res.status(401).json({ message: "No se pudo eliminar el administrador", data: administrador });
        }
        return res.status(200).json({ message: "Administrador eliminado", data: administradorEliminado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}
export const restaurarAdministrador: RequestHandler = async (req, res) => {
    const { codigo } = req.params;
    try {
        const administradoraRestaurar: Administradores | null = await Administradores.findByPk(codigo, { paranoid: false });
        var administrador = await administradoraRestaurar?.restore();
        if (!administrador) {
            return res.status(401).json({ message: "No se pudo recuperar el administrador", data: administrador });
        }
        return res.status(200).json({ message: "Se restauró un administrador", data: administradoraRestaurar });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}