"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proyecto = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const carrera_1 = require("./carrera");
const usuarios_1 = require("./usuarios");
const tareas_1 = require("./tareas");
let Proyecto = class Proyecto extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
    })
], Proyecto.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => tareas_1.Tarea, "Proyecto_id")
], Proyecto.prototype, "tareas", void 0);
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
        allowNull: false
    })
], Proyecto.prototype, "usuario_codigo", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => usuarios_1.Usuario, "usuario_codigo")
], Proyecto.prototype, "usuarios", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Proyecto.prototype, "carrera_clave", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => carrera_1.Carrera, "carrera_clave")
], Proyecto.prototype, "carrera", void 0);
Proyecto = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "proyecto",
    })
], Proyecto);
exports.Proyecto = Proyecto;
