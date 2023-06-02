import { Router } from "express";
import { crearRol, borrarRol, obtenerTRoles, actualizarRol} from "../controller/roles";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",autorizar,crearRol);
router.delete("/:id",autorizar,borrarRol);
router.get("/",autorizar,obtenerTRoles);
router.put("/:id",autorizar,actualizarRol);

export default router;