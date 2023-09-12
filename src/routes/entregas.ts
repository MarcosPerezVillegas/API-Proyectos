import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';

const router: Router = express.Router();
//configurar el destino del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const proyecto: string = req.params.proyecto_id;
    let destinationPath = path.join('./dist/Archivos', proyecto); //proyecto= nombre del proyecto, se necesita tener creada su carpeta
    if (req.path.includes('/Material')) {
      destinationPath = path.join(destinationPath, 'Material');
    }
    cb(null, destinationPath);
  },

  
  //Asignar el nombre del archivo: primero el nombre de la tarea, luego el nombre del alumno y luego la fecha y la hora en que se
  //entregó la tarea 
  filename: function (req, file, cb) {
    const id = req.params.id
    //extname(file.originalname) es para concervar la extención de archivo que se subió originalmente como entrega
    const nombreArchivo = `${id}${path.extname(file.originalname)}`; 
    cb(null, nombreArchivo);
  }
});

// Crea la instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Ruta para la entrega de archivos
router.post('/:id/:proyecto_id', upload.single('archivo'), (req, res) => {
  //const tareaId: string = req.params.id;
  //const nombreArchivo: string = (req.file as Express.Multer.File).filename;
  res.status(200).json({ message: 'Archivo entregado con éxito' });
});
router.post('/Material/:id/:proyecto_id', upload.single('archivo'), (req, res) => {
  //const tareaId: string = req.params.id;
  //const nombreArchivo: string = (req.file as Express.Multer.File).filename;
  res.status(200).json({ message: 'Archivo entregado con éxito' });
});

export default router;
