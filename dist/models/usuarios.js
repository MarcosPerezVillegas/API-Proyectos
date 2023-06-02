"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const roles_1 = require("./roles");
const proyectos_1 = require("./proyectos");
let Usuario = class Usuario extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        primaryKey: true,
    })
], Usuario.prototype, "codigo", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => proyectos_1.Proyecto, "usuario_codigo")
], Usuario.prototype, "proyecto", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Usuario.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Usuario.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    })
], Usuario.prototype, "telefono", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    })
], Usuario.prototype, "rol_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => roles_1.Rol, "rol_id")
], Usuario.prototype, "Rol_Usuario", void 0);
Usuario = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "usuario",
        paranoid: true
    })
], Usuario);
exports.Usuario = Usuario;
