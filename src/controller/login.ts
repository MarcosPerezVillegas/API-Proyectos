import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuarios";

export async function login(req:Request, res:Response){
    const{email, password} = req.body;
    const usuario = await Usuario.findOne({
        where: {email}
    })

    if(!usuario){
        return res.status(401).json({message:"El usuario no existe"});
    }

    const passValida = await bcrypt.compareSync(password,usuario.password);

    if(!passValida){
        return res.status(401).json({message:"La contraseña es incorrecta"})
    }

    const token = jwt.sign(
        {codigo:usuario.codigo},
        "Prueba 123",
        {expiresIn:'5h'}
    );
    res.json({token});

}