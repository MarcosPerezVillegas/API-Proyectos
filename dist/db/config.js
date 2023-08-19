"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const carrera_1 = require("../models/carrera");
const proyectos_1 = require("../models/proyectos");
const status_1 = require("../models/status");
const tareas_1 = require("../models/tareas");
const statusProyecto_1 = require("../models/statusProyecto");
const maestros_1 = require("../models/maestros");
const alumnos_1 = require("../models/alumnos");
exports.connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "mysql",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    logging: false,
    models: [carrera_1.Carrera, proyectos_1.Proyecto, status_1.Status, tareas_1.Tarea, statusProyecto_1.statusProyecto, maestros_1.Maestros, alumnos_1.Alumnos],
    port: 3306
});
exports.default = exports.connection;
