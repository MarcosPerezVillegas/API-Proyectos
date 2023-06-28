"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Proyecto_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proyecto = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const maestros_1 = require("./maestros");
const tareas_1 = require("./tareas");
const documento_1 = require("./documento");
const status_1 = require("./status");
const statusProyecto_1 = require("./statusProyecto");
const alumnos_1 = require("./alumnos");
let Proyecto = Proyecto_1 = class Proyecto extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        onDelete: 'Cascade'
    })
], Proyecto.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => status_1.Status, () => statusProyecto_1.statusProyecto)
], Proyecto.prototype, "statuses", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => maestros_1.Maestros, 'id')
], Proyecto.prototype, "encargado", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => tareas_1.Tarea, "Proyecto_id")
], Proyecto.prototype, "tareas", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => documento_1.documentos, "Proyecto_id")
], Proyecto.prototype, "documentos", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Proyecto.prototype, "carrera_clave", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Proyecto_1, "carrera_clave")
], Proyecto.prototype, "Carrera", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Proyecto.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Proyecto.prototype, "objetivos", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    })
], Proyecto.prototype, "fechainicio", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    })
], Proyecto.prototype, "fechafinal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    })
], Proyecto.prototype, "alumnos", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => alumnos_1.Alumnos, "proyecto_id")
], Proyecto.prototype, "Alumnos", void 0);
Proyecto = Proyecto_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "proyecto",
    })
], Proyecto);
exports.Proyecto = Proyecto;
