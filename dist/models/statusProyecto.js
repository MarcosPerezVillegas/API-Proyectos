"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusProyecto = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const proyectos_1 = require("./proyectos");
const status_1 = require("./status");
let statusProyecto = exports.statusProyecto = class statusProyecto extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
], statusProyecto.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => status_1.Status),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], statusProyecto.prototype, "status_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => proyectos_1.Proyecto),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], statusProyecto.prototype, "proyecto_id", void 0);
exports.statusProyecto = statusProyecto = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "status_proyecto",
        timestamps: false,
    })
], statusProyecto);
