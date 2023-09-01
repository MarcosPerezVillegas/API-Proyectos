import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'

const router: Router = express.Router();
//configurar el destino del archivo

const dir = path.resolve(__dirname,'..')
const carpeta = path.join(dir,'Archivos')
// Ruta para la entrega de archivos
router.get('/:id/:proyecto_id', (req, res) => {
    const proyecto: string = req.params.proyecto_id;
    const nombre: string = req.params.id;
    const tarea = `${carpeta}/${proyecto}/${nombre}.pdf`
    if (fs.existsSync(tarea)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${nombre}.pdf"`);
        fs.createReadStream(tarea).pipe(res);
    } else {
        res.status(404).json({ message: 'Archivo no encontrado' });
    }

});

export default router;
