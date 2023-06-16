import {Sequelize} from "sequelize-typescript";
import { Rol } from "../models/roles";
import { Usuario } from "../models/usuarios";
import { Carrera } from "../models/carrera";
import { Proyecto } from "../models/proyectos";
import { documentos } from "../models/documento";
import { Status } from "../models/status";
import { Tarea } from "../models/tareas";
import { statusProyecto } from "../models/statusProyecto";


export const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    logging: true,
    models:[Rol,Usuario,Carrera,Proyecto, documentos, Status, Tarea, statusProyecto],


    port: 33061
});

export default connection;