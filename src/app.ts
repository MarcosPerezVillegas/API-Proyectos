import express from "express";
import rutasRoles from "./routes/roles";
import rutasUsuarios from "./routes/usuarios"
import rutaLogin from "./routes/auth"
import rutaCarreras from "./routes/carreras"
import rutaProyectos from "./routes/proyectos"
import rutasDocumentos from "./routes/documentos"
import connection from "./db/config";
import { json, urlencoded } from "body-parser";

const app = express();

app.use(json());
app.use(urlencoded({extended:true}))

app.use("/Roles",rutasRoles);
app.use("/Usuarios",rutasUsuarios);
app.use("/Login",rutaLogin);
app.use("/Carreras",rutaCarreras);
app.use("/Proyectos",rutaProyectos);
app.use("/Documenos", rutasDocumentos);

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
app.listen(3000,()=>{
    console.log("Server iniciado en el puerto 3000");
});