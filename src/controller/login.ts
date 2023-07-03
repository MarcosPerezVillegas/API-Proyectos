import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Maestros } from "../models/maestros";
import { Alumnos } from "../models/alumnos";
import { Administradores } from "../models/administradores";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const maestro = await Maestros.findOne({
        where: { email }
    })
    const alumno = await Alumnos.findOne({
        where: { email }
    })
    if (!maestro && !alumno) {
        return res.status(401).json({ message: "El usuario no existe" });
    }
    if (maestro) {
        const passValida = await bcrypt.compareSync(password, maestro.password);
        if (!passValida) {
            return res.status(401).json({ message: "La contraseña es incorrecta" })
        }
        if (maestro.admin === 1) {
            console.log("1111111111111111111111111111111111")
            const token = jwt.sign(
                { codigo: maestro.codigo, rol: 'administrador' },
                "Prueba 123",
                { expiresIn: '5h' }
            );
            return res.json({ token });
        } else {
            console.log("0000000000000000000000000000000000000")
            const token = jwt.sign(
                { codigo: maestro.codigo, rol: 'maestro'},
                "Prueba 123",
                { expiresIn: '5h' }
            );
            return res.json({ token });
        }
    }
    if (alumno) {
        const passValida = await bcrypt.compareSync(password, alumno.password);
        if (!passValida) {
            return res.status(401).json({ message: "La contraseña es incorrecta" })
        }
        const token = jwt.sign(
            { codigo: alumno.codigo, rol: 'alumno' },
            "Prueba 123",
            { expiresIn: '5h' }
        );
        return res.json({ token });
    }
}
