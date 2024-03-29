import { RequestHandler } from "express";
import { Alumnos } from "../models/alumnos";
import { Op } from "sequelize";
var bcrypt = require('bcryptjs');

export const crearAlumno: RequestHandler = async (req, res) => {
    try {
        const email = req.body.email
        const codigo = req.body.codigo
        var a = await Alumnos.findByPk(codigo);
        const ae = await Alumnos.findByPk(codigo, { paranoid: false, });

        if(a || ae){
            return res.status(404).json({ message: "Ya existe un alumno con ese código"});
        }
        const aa = await Alumnos.findOne({ where: { email } });
        const aae = await Alumnos.findOne({
            where: {
                email,
                deletedAt: { [Op.not]: null }
            },
            paranoid: false,
        });
        if (aa || aae) {
            return res.status(404).json({ message: "Ya existe un alumno con ese correo" });
        }

        var alumno = await Alumnos.create({/*...req.body});*/
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),//cuando creamos el alumno, hasheamos el password con bcrypt
            telefono: req.body.telefono,
        });
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo crear al alumno", data: alumno });
        }
        return res.status(200).json({ message: "Alumno creado", data: alumno });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarAlumnos: RequestHandler = async (req, res) => {
    try {
        var alumnos = await Alumnos.findAll({
            attributes: { exclude: ["password"] }
        });
        if (!alumnos) {
            return res.status(401).json({ message: "No se pudo encontar los alumnos", data: alumnos });
        }
        return res.status(200).json({ message: "Alumnos encontrados: " + alumnos.length, data: alumnos });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const listarAlumnosElimidanos: RequestHandler = async (req, res) => {
    try {
        var alumnos = await Alumnos.findAll({
            where: {
                deletedAt: {[Op.not]: null}
            },
            paranoid: false,
            attributes: { exclude: ["password"] }
        });
        if (!alumnos) {
            return res.status(401).json({ message: "No se pudo encontar los alumnos", data: alumnos });
        }
        return res.status(200).json({ message: "Alumnos encontrados: " + alumnos.length, data: alumnos });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const infoCompletaAlumno: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var alumno = await Alumnos.findByPk(codigo,{
            attributes: {exclude: ["password"]}
        });
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo encontar al alumno", data: alumno });
        }
        return res.status(200).json({ message: "Alumno encontrado con toda su info", data: alumno });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const infoemailAlumno: RequestHandler = async (req, res) => {
    const { email } = req.params
    try {
        var alumno = await Alumnos.findOne({where: { email}, attributes: {exclude: ['password','telefono']}});
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo encontar al alumno", data: alumno });
        }
        return res.status(200).json({ message: "Alumno encontrado con toda su info", data: alumno });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const infoCompletaAlumnoEliminado: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var alumno = await Alumnos.findByPk(codigo, {
            paranoid: false,
        });
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo encontar al alumno", data: alumno });
        }
        return res.status(200).json({ message: "Alumno encontrado con toda su info", data: alumno });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const actualizarAlumno: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        const alumnoActualizado: Alumnos | null = await Alumnos.findByPk(codigo);
        let user = req.body
        if(user.password){
            user.password= await bcrypt.hash(req.body.password, 10)//cuando actualizamos el alumno, hasheamos el password con bcrypt
        }
        var alumno = await Alumnos.update({ ...req.body }, { where: { codigo: codigo } });
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo actualizar el Alumno", data: alumno });
        }
        return res.status(200).json({ message: "Alumno actualizado", data: alumnoActualizado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const CambiarPassword: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    const { password } = req.body
    try {
        if(password){
            const alumnoActualizado: Alumnos | null = await Alumnos.findByPk(codigo);
            var alumno = await Alumnos.update({password: await bcrypt.hash(req.body.password, 10)}, { where: { codigo: codigo } });
            if (!alumno) {
                return res.status(401).json({ message: "No se pudo actualizar el Alumno", data: alumno });
            }
            return res.status(200).json({ message: "Alumno actualizado", data: alumnoActualizado });
        }
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const eliminarAlumno: RequestHandler = async (req, res) => {
    const { codigo } = req.params;
    try {
        const alumnoEliminado: Alumnos | null = await Alumnos.findByPk(codigo);
        var alumno = await Alumnos.destroy({ where: { codigo } });
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo eliminar el Alumno", data: alumno });
        }
        return res.status(200).json({ message: "Alumno eliminado", data: alumnoEliminado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}

export const eliminarAlumnoPerma: RequestHandler = async (req, res) => {
    const { codigo } = req.params;
    try {
        const alumnoEliminado: Alumnos | null = await Alumnos.findByPk(codigo);
        var alumno = await Alumnos.destroy({ where: { codigo}, force: true });
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo eliminar el alumno", data: alumno });
        }
        return res.status(200).json({ message: "Alumno eliminado", data: alumnoEliminado });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}
export const restaurarAlumno: RequestHandler = async (req, res) => {
    const { codigo } = req.params;
    try {
        const alumnoaRestaurar: Alumnos | null = await Alumnos.findByPk(codigo, { paranoid: false });
        var alumno = await alumnoaRestaurar?.restore();
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo recuperar el alumno", data: alumno });
        }
        return res.status(200).json({ message: "Se restauró un Alumno", data: alumnoaRestaurar });
    } catch (error) {
        return res.status(404).json({ message: "", error });
    }

}