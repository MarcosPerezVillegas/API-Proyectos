require('dotenv').config()
import express from "express";
import rutasMaestros from "./routes/maestros"
import rutasAlumnos from "./routes/alumnos"
import rutaLogin from "./routes/auth"
import rutaCarreras from "./routes/carreras"
import rutaProyectos from "./routes/proyectos"
import rutasStatus from "./routes/status";
import rutasTareas from "./routes/tareas"
import rutaEntregaTareas from "./routes/entregas"
import rutaEntregaPropuesta from "./routes/propuesta"
import rutaCargaPropuesta from "./routes/cargaPropuesta"
import rutaCargarTarea from "./routes/cargaTarea"
import connection from "./db/config";
import { json, urlencoded } from "body-parser";

const cors = require("cors");
const app = express();

app.use(cors());
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(json());
app.use(urlencoded({extended:true}))

app.use("/Alumnos",rutasAlumnos);
app.use("/Maestros",rutasMaestros);
app.use("/Login",rutaLogin);
app.use("/Carreras",rutaCarreras);
app.use("/Proyectos",rutaProyectos);
app.use("/Status", rutasStatus);
app.use("/Tareas", rutasTareas);
app.use("/Tarea/Entrega", rutaEntregaTareas);
app.use("/Proyectos/Propuesta", rutaEntregaPropuesta);
app.use("/Proyectos/Cargar", rutaCargaPropuesta);
app.use("/Tarea/Cargar",rutaCargarTarea)
app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    )=>{
        res.status(500).json({messege: err.message});
    }
)

connection.sync().then(()=>{
    console.log("La base de datos funciona");
}).catch((error)=>{
    console.log("Error",error);
});
app.listen(Number(process.env.PORT),()=>{
    console.log(`Server iniciado en el puerto ${process.env.PORT}`);
});