import {Sequelize} from "sequelize-typescript";
import { Rol } from "../models/roles";
import { Usuario } from "../models/usuarios";
import { Carrera } from "../models/carrera";
import { Proyecto } from "../models/proyectos";
import { documentos } from "../models/documento";
<<<<<<< HEAD
import { Status } from "../models/status";
=======
import { Tarea } from "../models/tareas";
>>>>>>> ff3e68f596274b16cdf3805853dbc02e97e7d0ef

const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    logging: true,
<<<<<<< HEAD
    models:[Rol,Usuario,Carrera,Proyecto, documentos, Status],
=======
    models:[Rol,Usuario,Carrera,Proyecto,documentos, Tarea],
>>>>>>> ff3e68f596274b16cdf3805853dbc02e97e7d0ef
    
    port: 33061
});

export default connection;