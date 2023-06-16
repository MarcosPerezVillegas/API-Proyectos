import { Router } from "express";
import { crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    listarUsuarios,
    listarUsuariosElimidanos,
    infoCompletaUsuario,
    infoCompletaUsuarioEliminado,
    restaurarUsuario} from "../controller/usuarios";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",autorizar,crearUsuario);
router.delete("/:codigo",autorizar,eliminarUsuario);
router.get("/",listarUsuarios);
router.get("/Deleted",listarUsuariosElimidanos);
router.get("/Deleted/:codigo",infoCompletaUsuarioEliminado);
router.get("/:codigo",autorizar,infoCompletaUsuario);
router.put("/:codigo",autorizar,actualizarUsuario);
router.get("/Restaurar/:codigo",autorizar,restaurarUsuario);

export default router;