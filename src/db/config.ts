import {Sequelize} from "sequelize-typescript";
import { Carrera } from "../models/carrera";
import { Proyecto } from "../models/proyectos";
import { documentos } from "../models/documento";
import { Status } from "../models/status";
import { Tarea } from "../models/tareas";
import { statusProyecto } from "../models/statusProyecto";
import { Maestros } from "../models/maestros";
import { Alumnos } from "../models/alumnos";
import { encargadosProyectos } from "../models/encargadosProyectos";
import { Administradores } from "../models/administradores";


export const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    logging: true,
    models:[Carrera,Proyecto,documentos,Status,Tarea,statusProyecto,Maestros,Alumnos,Administradores,encargadosProyectos],


    port: 33061
});

export default connection;