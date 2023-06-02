"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const roles_1 = require("../models/roles");
const usuarios_1 = require("../models/usuarios");
const carrera_1 = require("../models/carrera");
const proyectos_1 = require("../models/proyectos");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    logging: true,
    models: [roles_1.Rol, usuarios_1.Usuario, carrera_1.Carrera, proyectos_1.Proyecto],
    port: 33061
});
exports.default = connection;
