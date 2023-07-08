import { Router } from "express";
import { crearMaestro,
    actualizarMaestro,
    eliminarMaestro,
    listarMaestros,
    listarAdmins,
    listarMaestrosElimidanos,
    listarAdminsElimidanos,
    infoemailMaestro,
    infoCompletaMaestro,
    infoCompletaMaestroEliminado,
    eliminarMaestroPerma,
    buscarMaestroNombre,
    restaurarMaestro} from "../controller/maestros";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",crearMaestro);
router.delete("/:codigo",autorizar,eliminarMaestro);
router.get("/",autorizar,listarMaestros);
router.get("/Admins",autorizar,listarAdmins);
router.get("/Admins/Eliminados",autorizar,listarAdminsElimidanos);
router.get("/Email/:email",infoemailMaestro);
router.get("/Eliminados",autorizar,listarMaestrosElimidanos);
router.get("/Eliminados/:codigo",autorizar,infoCompletaMaestroEliminado);
router.delete("/Eliminados/:codigo",autorizar,eliminarMaestroPerma);
router.get("/:codigo",autorizar,infoCompletaMaestro);
router.get("/Nombre/:nombre",autorizar,buscarMaestroNombre);
router.put("/:codigo",autorizar,actualizarMaestro);
router.get("/Restaurar/:codigo",autorizar,restaurarMaestro);

export default router;