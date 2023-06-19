import { Router } from "express";
import { crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    listarUsuarios,
    listarUsuariosElimidanos,
    infoemailUsuario,
    infoCompletaUsuario,
    infoCompletaUsuarioEliminado,
    eliminarUsuarioPerma,
    restaurarUsuario} from "../controller/usuarios";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",crearUsuario);
router.delete("/:codigo",autorizar,eliminarUsuario);
router.get("/",listarUsuarios);
router.get("/:email",autorizar,infoemailUsuario);
router.get("/Eliminados",autorizar,listarUsuariosElimidanos);
router.get("/Eliminados/:codigo",autorizar,infoCompletaUsuarioEliminado);
router.delete("/Eliminados/:codigo",autorizar,eliminarUsuarioPerma);
router.get("/:codigo",autorizar,infoCompletaUsuario);
router.put("/:codigo",autorizar,actualizarUsuario);
router.get("/Restaurar/:codigo",autorizar,restaurarUsuario);

export default router;