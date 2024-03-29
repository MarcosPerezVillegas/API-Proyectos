import { Request, Response } from "express";
var bcrypt = require('bcryptjs');
import jwt from "jsonwebtoken";
import { Maestros } from "../models/maestros";
import { Alumnos } from "../models/alumnos";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const maestro = await Maestros.findOne({
        where: { email }
    })
    const alumno = await Alumnos.findOne({
        where: { email }
    })
    if (!maestro && !alumno) {
        return res.status(404).json({ message: "El usuario no existe" });
    }
    if (maestro) {
        const passValida = await bcrypt.compareSync(password, maestro.password);
        if (!passValida) {
            return res.status(401).json({ message: "La contraseña es incorrecta" })
        }
        if (maestro.admin === 1) {
            const token = jwt.sign(
                { codigo: maestro.codigo, rol: 'administrador' },
                "q$x;-#g$(-mKN7#P#SFYjZekVU{)wm",
                { expiresIn: '2h' }
            );
            return res.json({ token });
        } else {
            const token = jwt.sign(
                { codigo: maestro.codigo, rol: 'maestro'},
                "q$x;-#g$(-mKN7#P#SFYjZekVU{)wm",
                { expiresIn: '2h' }
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
            "q$x;-#g$(-mKN7#P#SFYjZekVU{)wm",
            { expiresIn: '2h' }
        );
        return res.json({ token });
    }
}
