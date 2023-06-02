import { Router } from "express";
import { crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    listarUsuarios,
    infoCompletaUsuario,
    restaurarUsuario} from "../controller/usuarios";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",autorizar,crearUsuario);
router.delete("/:codigo",autorizar,eliminarUsuario);
router.get("/",listarUsuarios);
router.get("/:codigo",autorizar,infoCompletaUsuario);
router.put("/:codigo",autorizar,actualizarUsuario);
router.get("/",autorizar,restaurarUsuario);

export default router;