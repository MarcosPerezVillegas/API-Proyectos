import { Router } from "express";
import { crearAdministrador,
    actualizarAdministrador,
    eliminarAdministrador,
    listarAdministradores,
    listarAdministradoresElimidanos,
    infoemailAdministrador,
    infoCompletaAdministrador,
    infoCompletaAdministradorEliminado,
    eliminarAdministradorPerma,
    //buscarMaestroNombre,
    restaurarAdministrador} from "../controller/administradores";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",autorizar,crearAdministrador);
router.delete("/:codigo",autorizar,eliminarAdministrador);
router.get("/",listarAdministradores);
router.get("/Email/:email",autorizar,infoemailAdministrador);
router.get("/Eliminados",autorizar,listarAdministradoresElimidanos);
router.get("/Eliminados/:codigo",autorizar,infoCompletaAdministradorEliminado);
router.delete("/Eliminados/:codigo",autorizar,eliminarAdministradorPerma);
router.get("/:codigo",autorizar,infoCompletaAdministrador);
//router.get("/Nombre/:nombre",autorizar,buscarmaestroNombre);
router.put("/:codigo",autorizar,actualizarAdministrador);
router.get("/Restaurar/:codigo",autorizar,restaurarAdministrador);

export default router;