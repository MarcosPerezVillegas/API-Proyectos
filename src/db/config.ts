import {Sequelize} from "sequelize-typescript";
import { Rol } from "../models/roles";
import { Usuario } from "../models/usuarios";
import { Carrera } from "../models/carrera";
import { Proyecto } from "../models/proyectos";
import { documentos } from "../models/documento";

const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    logging: true,
    models:[Rol,Usuario,Carrera,Proyecto, documentos],
    
    port: 33061
});

export default connection;