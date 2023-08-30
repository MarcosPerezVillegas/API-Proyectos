import { Router } from "express";
import { crearProyecto,
    listarProyectos,
    BuscarProyectoId,
    BuscarProyectoNombre,
    BuscarProyectoUsuario,
    //BuscarProyectosCarrera,
    actualizarProyecto,
    eliminarProyecto,} from "../controller/proyectos";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",autorizar,crearProyecto);
router.delete("/:id",autorizar,eliminarProyecto);
router.get("/",listarProyectos);
router.get("/:id",BuscarProyectoId);
router.get("/Nombre/:nombre",BuscarProyectoNombre);
router.get("/Usuario/:codigo",BuscarProyectoUsuario);
//router.get("/Carrera/:carrera_clave",BuscarProyectosCarrera);
router.put("/:id",autorizar,actualizarProyecto);

export default router;