"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const roles_1 = require("../models/roles");
const usuarios_1 = require("../models/usuarios");
const carrera_1 = require("../models/carrera");
const proyectos_1 = require("../models/proyectos");
const documento_1 = require("../models/documento");
const status_1 = require("../models/status");
const tareas_1 = require("../models/tareas");
exports.connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    logging: true,
    models: [roles_1.Rol, usuarios_1.Usuario, carrera_1.Carrera, proyectos_1.Proyecto, documento_1.documentos, status_1.Status, tareas_1.Tarea],
    port: 33061
});
exports.default = exports.connection;
