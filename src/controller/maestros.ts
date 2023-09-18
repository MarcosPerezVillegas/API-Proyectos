import { RequestHandler } from "express";
import { Maestros } from "../models/maestros";
import { Op } from "sequelize";
import bcrypt from 'bcrypt';
import { Proyecto } from "../models/proyectos";

export const crearMaestro: RequestHandler = async (req, res) => {
    try {
        const email = req.body.email
        const codigo = req.body.codigo
        const m = await Maestros.findByPk(codigo);
        const me = await Maestros.findByPk(codigo, { paranoid: false, });
        if (m || me) {
            return res.status(404).json({ message: "Ya existe un maestro con ese código" });
        }
        const ma = await Maestros.findOne({ where: { email } });
        const mae = await Maestros.findOne({
            where: {
                email,
                deletedAt: { [Op.not]: null }
            },
            paranoid: false,
        });
        if (ma || mae) {
            return res.status(404).json({ message: "Ya existe un maestro con ese correo" });
        }

        var maestro = await Maestros.create({/*...req.body});*/
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),//cuando creamos el maestro, hasheamos el password con bcrypt
            telefono: req.body.telefono,
            admin: req.body.admin
        });
        if (!maestro) {
            return res.status(404).json({ message: "No se pudo crear al maestro", data: maestro });
        }
        return res.status(200).json({ message: "Maestro creado", data: maestro });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarMaestros: RequestHandler = async (req, res) => {
    try {
        var maestros = await Maestros.findAll({
            where: {
                admin: 0
            },
            include:
            {
                model: Proyecto,
                attributes: { exclude: ["codigo"] }
            },
            attributes: { exclude: ["password", "admin"] }
        });
        if (!maestros) {
            return res.status(401).json({ message: "No se pudo encontar los maestros", data: maestros });
        }
        return res.status(200).json({ message: "Maestros encontrados: " + maestros.length, data: maestros });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarAdmins: RequestHandler = async (req, res) => {
    try {
        var maestros = await Maestros.findAll({
            where: {
                admin: 1
            },
            include:
            {
                model: Proyecto,
                attributes: { exclude: ["codigo"] }
            },
            attributes: { exclude: ["password", "admin"] }
        });
        if (!maestros) {
            return res.status(401).json({ message: "No se pudo encontar los administradores", data: maestros });
        }
        return res.status(200).json({ message: "Administradores encontrados: " + maestros.length, data: maestros });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarMaestrosEliminados: RequestHandler = async (req, res) => {
    try {
        var maestros = await Maestros.findAll({
            where: {
                admin: 0,
                deletedAt: { [Op.not]: null }
            },
            paranoid: false,
            attributes: { exclude: ["password"] }
        });
        if (!maestros) {
            return res.status(401).json({ message: "No se pudo encontar los maestros", data: maestros });
        }
        return res.status(200).json({ message: "Maestros encontrados: " + maestros.length, data: maestros });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarAdminsEliminados: RequestHandler = async (req, res) => {
    try {
        var maestros = await Maestros.findAll({
            where: {
                admin: 1,
                deletedAt: { [Op.not]: null }
            },
            paranoid: false,
            attributes: { exclude: ["password"] }
        });
        if (!maestros) {
            return res.status(401).json({ message: "No se pudo encontar los administradores", data: maestros });
        }
        return res.status(200).json({ message: "Administradores encontrados: " + maestros.length, data: maestros });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const infoCompletaMaestro: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var maestro = await Maestros.findByPk(codigo, {
            attributes: { exclude: ["password"] }
        });
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al maestro", data: maestro });
        }
        return res.status(200).json({ message: "Maestro encontrado con toda su info", data: maestro });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const buscarMaestroNombre: RequestHandler = async (req, res) => {
    const { nombre } = req.params
    try {
        console.log(nombre)
        var maestro = await Maestros.findOne({ where: { nombre }, attributes: { exclude: ["password"] } });
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al maestro", data: maestro });
        }
        return res.status(200).json({ message: "Maestro encontrado con toda su info", data: maestro });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const infoemailMaestro: RequestHandler = async (req, res) => {
    const { email } = req.params
    try {
        var maestro: Maestros | null = await Maestros.findOne({
            where: { email },
            include: Proyecto,
            attributes: { exclude: ['password', 'telefono'] }
        });
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al maestro", data: maestro });
        }
        return res.status(200).json({ message: "Maestro encontrado con toda su info", data: maestro });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const infoCompletaMaestroEliminado: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var maestro = await Maestros.findByPk(codigo, { paranoid: false, });
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al maestro", data: maestro });
        }
        return res.status(200).json({ message: "Maestro encontrado con toda su info", data: maestro });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const actualizarMaestro: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        const maestroActualizado: Maestros | null = await Maestros.findByPk(codigo);
        let user = req.body
        if (user.password) {
            user.password = await bcrypt.hash(req.body.password, 10)//cuando actualizamos el maestro, hasheamos el password con bcrypt
        }
        const maestro = await Maestros.update({ ...user }, { where: { codigo: codigo } });
        if (!maestro) {
            return res.status(404).json({ message: "No se pudo actualizar el maestro", data: maestro });
        }
        return res.status(200).json({ message: "Maestro actualizado", data: maestroActualizado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const CambiarPassword: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    const { password } = req.body
    try {
        if (password) {
            const maestroActualizado: Maestros | null = await Maestros.findByPk(codigo);
            var maestro = await Maestros.update({ password: await bcrypt.hash(req.body.password, 10) }, { where: { codigo: codigo } });
            if (!maestro) {
                return res.status(401).json({ message: "No se pudo actualizar el maestro", data: maestro });
            }
            return res.status(200).json({ message: "Maestro actualizado", data: maestroActualizado });
        }
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
            return res.status(404).json({ message: "No se pudo eliminar el maestro", data: maestro });
        }
        return res.status(200).json({ message: "Maestro eliminado", data: maestroEliminado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const eliminarMaestroPerma: RequestHandler = async (req, res) => {
    const { codigo } = req.params;
    try {
        const maestroEliminado: Maestros | null = await Maestros.findByPk(codigo);
        var maestro = await Maestros.destroy({ where: { codigo }, force: true });
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo eliminar el maestro", data: maestro });
        }
        return res.status(200).json({ message: "Maestro eliminado", data: maestroEliminado });
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