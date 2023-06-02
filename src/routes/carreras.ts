import { Router } from "express";
import { crearCarrera,
    borrarCarrera,
    actualizarCarrera,
    obtenerTCarreras,
    obtenerCarreraClave} from "../controller/carrera";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",autorizar,crearCarrera);
router.delete("/:clave",autorizar,borrarCarrera);
router.get("/",obtenerTCarreras);
router.get("/:clave",obtenerCarreraClave);
router.put("/:clave",autorizar,actualizarCarrera);

export default router;