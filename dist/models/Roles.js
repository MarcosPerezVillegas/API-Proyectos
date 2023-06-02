"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const usuarios_1 = require("./usuarios");
let Rol = class Rol extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Rol.prototype, "rol", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        allowNull: false
    })
], Rol.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => usuarios_1.Usuario, "rol_id")
], Rol.prototype, "usuario", void 0);
Rol = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "rol"
    })
], Rol);
exports.Rol = Rol;
