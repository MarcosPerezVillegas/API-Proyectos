import { Router } from "express";
import { addstat, dropstat, obtstat, BuscarProyecto, updstat} from "../controller/status";
import { autorizar } from "../middleware/verify_token";

const router = Router();

router.post("/",autorizar, addstat);
router.delete("/:Proyecto_id",autorizar, dropstat);
router.put("/:Proyecto_id",autorizar, updstat);
router.get("/", obtstat);
router.get("/:Proyecto_id",BuscarProyecto);

export default router;