import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';

interface AuthenticatedRequest extends Request{
    usuarioCodigo?:string;
    usuarioRol?:string
}

export function autorizar(req:AuthenticatedRequest, res:Response, next:NextFunction){

    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"El token es necesario"});
    }

    try{
        const payload = jwt.verify(token,"Prueba 123");
        req.usuarioCodigo = (payload as any).codigo;
        req.usuarioRol = (payload as any).rol;
        next();
    }catch(error){
        return res.status(401).json({message:"Token invalido"})
    }
}

