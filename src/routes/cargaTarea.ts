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
router.get('/:id/:proyecto_id', (req, res) => {
    const proyecto: string = req.params.proyecto_id;
    const nombre: string = req.params.id;
    const tarea = `${carpeta}/${proyecto}`
    try {
        const archivos = fs.readdirSync(tarea);
        let archivo = archivos.filter((archivo) => archivo.includes('.'));
        archivo = archivo.filter((archivo) => archivo.includes(nombre.toString()));
        if (archivo[0]) {
            const tareaDir = path.join(tarea, archivo[0])
            const contentType = mime.getType(path.extname(tareaDir));

            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Disposition', `attachment; filename="${nombre}"`);
            fs.createReadStream(tareaDir).pipe(res);
        } else {
            res.status(404).json({ message: 'Archivo no encontrado' });
        }
    } catch (error) {
        res.status(404).json({ message: 'No hay ningun archivo entregado' });
    }


});

router.get('/Material/:id/:proyecto_id', (req, res) => {
    const proyecto: string = req.params.proyecto_id;
    const nombre: string = req.params.id;
    const tarea = `${carpeta}/${proyecto}/${nombre}-Material`
    try {
        const archivo = fs.readdirSync(tarea)
        let nombreSinExtension
        let archivoEncontrado = archivo.find(archivo => {
            nombreSinExtension = archivo.replace(/\.[^/.]+$/, "");
            return archivo.startsWith(nombreSinExtension);
        });
        if (archivoEncontrado) {
            const tareaDir = path.join(tarea, archivoEncontrado)
            const contentType = mime.getType(path.extname(tareaDir));
            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Disposition', `attachment; filename="${nombreSinExtension}"`);
            fs.createReadStream(tareaDir).pipe(res);
        } else {
            res.status(404).json({ message: 'Archivo no encontrado' });
        }
    } catch (error) {
        res.status(404).json({ message: 'No hay material de apoyo' });
    }

});

export default router;
