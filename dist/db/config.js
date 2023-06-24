"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const carrera_1 = require("../models/carrera");
const proyectos_1 = require("../models/proyectos");
const documento_1 = require("../models/documento");
const status_1 = require("../models/status");
const tareas_1 = require("../models/tareas");
const statusProyecto_1 = require("../models/statusProyecto");
const maestros_1 = require("../models/maestros");
const alumnos_1 = require("../models/alumnos");
const encargadosProyectos_1 = require("../models/encargadosProyectos");
exports.connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    logging: true,
    models: [carrera_1.Carrera, proyectos_1.Proyecto, documento_1.documentos, status_1.Status, tareas_1.Tarea, statusProyecto_1.statusProyecto, maestros_1.Maestros, alumnos_1.Alumnos, encargadosProyectos_1.encargadosProyectos],
    port: 33061
});
exports.default = exports.connection;
