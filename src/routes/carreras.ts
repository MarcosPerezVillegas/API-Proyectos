import { Router } from "express";
import { crearCarrera,
    borrarCarrera,
    actualizarCarrera,
    obtenerTCarreras,
    obtenerCarreraClave,
    obtenerCarreraNombre} from "../controller/carrera";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",autorizar,crearCarrera);
router.delete("/:clave",autorizar,borrarCarrera);
router.get("/",obtenerTCarreras);
router.get("/:clave",obtenerCarreraClave);
router.get("/Nombre/:nombre",obtenerCarreraNombre);
router.put("/:clave",autorizar,actualizarCarrera);

export default router;