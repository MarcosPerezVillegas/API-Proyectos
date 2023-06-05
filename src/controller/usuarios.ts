import { RequestHandler } from "express";
import { Usuario } from "../models/usuarios";
import {Op} from "sequelize";
import bcrypt from 'bcrypt';
import { Rol } from "../models/roles";

export const crearUsuario:RequestHandler =async (req,res) => {
    var usuario = await Usuario.create({/*...req.body});*/
        codigo:req.body.codigo,
        nombre: req.body.nombre,
        email:req.body.email,
        password: await bcrypt.hash(req.body.password,10),//cuando creamos el usuario, hasheamos el password con bcrypt
        telefono: req.body.telefono,
        rol_id:req.body.rol_id
    });
    if(!usuario){
        return res.status(401).json({message:"No se pudo crear al usuario",data:usuario});
    }
    return res.status(200).json({message:"Usuario creado", data:usuario});
}

export const listarUsuarios:RequestHandler =async (req,res) => {
    var usuarios = await Usuario.findAll({
        attributes: {exclude:["password"]}
    });
    if(!usuarios){
        return res.status(401).json({message:"No se pudo encontar los usuarios",data:usuarios});
    }
    return res.status(200).json({message:"Usuarios encontrados: "+usuarios.length, data:usuarios});
}

export const infoCompletaUsuario:RequestHandler =async (req,res) => {
    const {codigo} = req.params
    var usuario = await Usuario.findByPk(codigo,{
        include:Rol,
        attributes: {exclude:["rol_id"]}
    });
    if(!usuario){
        return res.status(401).json({message:"No se pudo encontar al usuario",data:usuario});
    }
    return res.status(200).json({message:"Usuario encontrado con toda su info",data:usuario});
}

export const actualizarUsuario:RequestHandler =async (req,res) => {
    const {codigo} = req.params
    const usuarioActualizado:Usuario|null = await Usuario.findByPk(codigo);
    var usuario = await Usuario.update({...req.body},{where:{codigo:codigo}});
    if(!usuario){
        return res.status(401).json({message:"No se pudo actualizar el usuario",data:usuario});
    }
    return res.status(200).json({message:"Usuario actualizado", data:usuarioActualizado});
}

export const eliminarUsuario:RequestHandler =async (req,res) => {
    const {codigo} = req.params;
    const usuarioEliminado:Usuario|null = await Usuario.findByPk(codigo);
    var usuario = await Usuario.destroy({where:{codigo}});
    if(!usuario){
        return res.status(401).json({message:"No se pudo eliminar el usuario",data:usuario});
    }
    return res.status(200).json({message:"Usuario eliminado",data:usuarioEliminado});    
}

export const restaurarUsuario:RequestHandler =async (req,res) => {
    const {codigo} = req.params;
    const usuarioaRestaurar:Usuario|null = await Usuario.findByPk(codigo,{paranoid:false});
    var usuario = await usuarioaRestaurar?.restore();
    if(!usuario){
        return res.status(401).json({message:"No se pudo recuperar el usuario",data:usuario});
    }
    return res.status(200).json({message:"Se restauró un usuario",data:usuarioaRestaurar});
}