import { RequestHandler } from "express";
import { Alumnos } from "../models/alumnos";
import { Op } from "sequelize";
import bcrypt from 'bcrypt';
import { Administradores } from "../models/administradores";
import { Maestros } from "../models/maestros";

export const adminToAlumn: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var admin = await Administradores.findByPk(codigo);
        if (!admin) {
            return res.status(401).json({ message: "No se pudo encontar al administrador", data: admin });
        }
        try {
            var alumno = await Alumnos.create({
                codigo: admin.codigo,
                nombre: admin.nombre,
                email: admin.email,
                password: admin.password,
                telefono: admin.telefono,
            });
            await Administradores.destroy({ where: {codigo: admin.codigo}, force: true })
        }
        catch(error){
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error});
        }
            return res.status(200).json({ message: "Usuario modificado con exito"});
        } catch (error) {
            return res.status(404).json({ message: "Algo salió mal: ", error });
        }
}

export const adminToMaest: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var admin = await Administradores.findByPk(codigo);
        if (!admin) {
            return res.status(401).json({ message: "No se pudo encontar al administrador", data: admin });
        }
        try {
            var maestro = await Maestros.create({
                codigo: admin.codigo,
                nombre: admin.nombre,
                email: admin.email,
                password: admin.password,
                telefono: admin.telefono,
            });
            await Administradores.destroy({ where: {codigo: admin.codigo}, force: true })
        }
        catch(error){
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error});
        }
            return res.status(200).json({ message: "Usuario modificado con exito"});
        } catch (error) {
            return res.status(404).json({ message: "Algo salió mal: ", error });
        }
}

export const maestToAdmin: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var maestro = await Maestros.findByPk(codigo);
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al maestro", data: maestro });
        }
        try {
            var administrador = await Administradores.create({
                codigo: maestro.codigo,
                nombre: maestro.nombre,
                email: maestro.email,
                password: maestro.password,
                telefono: maestro.telefono,
            });
            await Maestros.destroy({ where: {codigo: maestro.codigo}, force: true})
        }
        catch(error){
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error});
        }
            return res.status(200).json({ message: "Usuario modificado con exito"});
        } catch (error) {
            return res.status(404).json({ message: "Algo salió mal: ", error });
        }
}

export const maestToAlumn: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var maestro = await Maestros.findByPk(codigo);
        if (!maestro) {
            return res.status(401).json({ message: "No se pudo encontar al administrador", data: maestro });
        }
        try {
            var alumno = await Alumnos.create({
                codigo: maestro.codigo,
                nombre: maestro.nombre,
                email: maestro.email,
                password: maestro.password,
                telefono: maestro.telefono,
            });
            await Maestros.destroy({ where: {codigo: maestro.codigo}, force: true })
        }
        catch(error){
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error});
        }
            return res.status(200).json({ message: "Usuario modificado con exito"});
        } catch (error) {
            return res.status(404).json({ message: "Algo salió mal: ", error });
        }
}

export const alumnToAdmin: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var alumno = await Alumnos.findByPk(codigo);
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo encontar al alumno", data: alumno });
        }
        try {
            var administrador = await Administradores.create({
                codigo: alumno.codigo,
                nombre: alumno.nombre,
                email: alumno.email,
                password: alumno.password,
                telefono: alumno.telefono,
            });
            await Alumnos.destroy({ where: {codigo: alumno.codigo}, force: true })
        }
        catch(error){
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error});
        }
            return res.status(200).json({ message: "Usuario modificado con exito"});
        } catch (error) {
            return res.status(404).json({ message: "Algo salió mal: ", error });
        }
}

export const alumnToMaest: RequestHandler = async (req, res) => {
    const { codigo } = req.params
    try {
        var alumno = await Alumnos.findByPk(codigo);
        if (!alumno) {
            return res.status(401).json({ message: "No se pudo encontar al alumno", data: alumno });
        }
        try {
            var maestro = await Maestros.create({
                codigo: alumno.codigo,
                nombre: alumno.nombre,
                email: alumno.email,
                password: alumno.password,
                telefono: alumno.telefono,
            });
            await Alumnos.destroy({ where: {codigo: alumno.codigo}, force: true })
        }
        catch(error){
            return res.status(401).json({ message: "No se pudo modificar el usuario: ", error});
        }
            return res.status(200).json({ message: "Usuario modificado con exito"});
        } catch (error) {
            return res.status(404).json({ message: "Algo salió mal: ", error });
        }
}