import { Router } from "express";
import { crearRol, borrarRol, obtenerTRoles, actualizarRol, obtenerRolId} from "../controller/roles";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",autorizar,crearRol);
router.delete("/:id",autorizar,borrarRol);
router.get("/",obtenerTRoles);
router.get("/:id",autorizar,obtenerRolId);
router.put("/:id",autorizar,actualizarRol);

export default router;