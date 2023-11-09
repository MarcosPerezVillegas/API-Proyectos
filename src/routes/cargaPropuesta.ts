import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import { arch } from 'os';
const mime = require('mime');

const router: Router = express.Router();
//configurar el destino del archivo

const dir = path.resolve(__dirname, '..')
const carpeta = path.join(dir, 'Archivos')
// Ruta para la entrega de archivos

router.get('/:proyecto_id', (req, res) => {
    const proyecto: string = req.params.proyecto_id;
    const propuesta = `${carpeta}/${proyecto}/Propuesta`
    try {
        const archivo = fs.readdirSync(propuesta)
        let nombreSinExtension
        let archivoEncontrado = archivo.find(archivo => {
            nombreSinExtension = archivo.replace(/\.[^/.]+$/, "");
            return archivo.startsWith(nombreSinExtension);
        });
        if (archivoEncontrado) {
            const dir = path.join(propuesta, archivoEncontrado)
            const contentType = mime.getType(path.extname(dir));
            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Disposition', `attachment; filename="${nombreSinExtension}"`);
            fs.createReadStream(dir).pipe(res);
        } else {
            res.status(404).json({ message: 'Archivo no encontrado' });
        }
    } catch (error) {
        res.status(404).json({ message: 'No hay propuesta del proyecto' });
    }

});

export default router;
