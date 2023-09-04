import { Router } from "express";
import { crearAlumno,
    actualizarAlumno,
    eliminarAlumno,
    listarAlumnos,
    listarAlumnosElimidanos,
    infoemailAlumno,
    infoCompletaAlumno,
    infoCompletaAlumnoEliminado,
    eliminarAlumnoPerma,
    //buscarAlumnoNombre,
    CambiarPassword,
    restaurarAlumno} from "../controller/alumnos";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",crearAlumno);
router.delete("/:codigo",autorizar,eliminarAlumno);
router.get("/",autorizar,listarAlumnos);
router.get("/Email/:email",infoemailAlumno);
router.get("/Eliminados",autorizar,listarAlumnosElimidanos);
router.get("/Eliminados/:codigo",autorizar,infoCompletaAlumnoEliminado);
router.delete("/Eliminados/:codigo",autorizar,eliminarAlumnoPerma);
router.get("/:codigo",infoCompletaAlumno);
//router.get("/Nombre/:nombre",autorizar,buscarAlumnoNombre);
router.put("/:codigo",autorizar,actualizarAlumno);
router.put("/Cambiar/:codigo",CambiarPassword);
router.get("/Restaurar/:codigo",autorizar,restaurarAlumno);

export default router;