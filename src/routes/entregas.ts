import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';

const router: Router = express.Router();
//configurar el destino del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const proyecto: string = req.params.proyecto;
    const destinationPath = path.join('E:/Entregas/', proyecto); //proyecto= nombre del proyecto, se necesita tener creada su carpeta
    cb(null, destinationPath);
  },
  //Asignar el nombre del archivo: primero el nombre de la tarea, luego el nombre del alumno y luego la fecha y la hora en que se
  //entregó la tarea 
  filename: function (req, file, cb) {
    const tareaNombre = req.params.nombre
    const alumnNombre = req.params.alumno
    const fechaEntrega: string = new Date().toISOString().replace(/[:.]/g, '-'); // Por ejemplo: 2023-05-30T12-30-45
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Asignar valores unicos
    //extname(file.originalname) es para concervar la extención de archivo que se subió originalmente como entrega
    const nombreArchivo = `${tareaNombre}_${alumnNombre}_${fechaEntrega}_${path.extname(file.originalname)}`; 
    cb(null, nombreArchivo);
  }
});

// Crea la instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Ruta para la entrega de archivos
router.post('/:id/:alumno/:nombre/:proyecto', upload.single('archivo'), (req, res) => {
  //const tareaId: string = req.params.id;
  //const nombreArchivo: string = (req.file as Express.Multer.File).filename;
  res.status(200).json({ message: 'Archivo entregado con éxito' });
});

export default router;
