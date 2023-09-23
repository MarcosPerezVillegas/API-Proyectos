require('dotenv').config()
import {Sequelize} from "sequelize-typescript";
import { Carrera } from "../models/carrera";
import { Proyecto } from "../models/proyectos";
import { Status } from "../models/status";
import { Tarea } from "../models/tareas";
import { statusProyecto } from "../models/statusProyecto";
import { Maestros } from "../models/maestros";
import { Alumnos } from "../models/alumnos";


export const connection = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    logging: false,
    models:[Carrera,Proyecto,Status,Tarea,statusProyecto,Maestros,Alumnos],


    port: Number(process.env.DB_PORT)
});

export default connection;