"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roles_1 = __importDefault(require("./routes/roles"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const auth_1 = __importDefault(require("./routes/auth"));
const carreras_1 = __importDefault(require("./routes/carreras"));
const proyectos_1 = __importDefault(require("./routes/proyectos"));
const documentos_1 = __importDefault(require("./routes/documentos"));
const status_1 = __importDefault(require("./routes/status"));
const tareas_1 = __importDefault(require("./routes/tareas"));
const config_1 = __importDefault(require("./db/config"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/Roles", roles_1.default);
app.use("/Usuarios", usuarios_1.default);
app.use("/Login", auth_1.default);
app.use("/Carreras", carreras_1.default);
app.use("/Proyectos", proyectos_1.default);
app.use("/Status", status_1.default);
app.use("/Documentos", documentos_1.default);
app.use("/Tareas", tareas_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ messege: err.message });
});
config_1.default.sync().then(() => {
    console.log("La base de datos funciona");
}).catch((error) => {
    console.log("Error", error);
});
app.listen(3000, () => {
    console.log("Server iniciado en el puerto 3000");
});
