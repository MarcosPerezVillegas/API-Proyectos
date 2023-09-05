import { Router } from "express";
import { addstat, dropstat, obtstat, BuscarProyecto, updstat, BuscarStatus} from "../controller/status";
import { autorizar } from "../middleware/verify_token";

const router = Router();

router.post("/",autorizar, addstat);
router.delete("/:id",autorizar, dropstat);
router.put("/:id",autorizar, updstat);
router.get("/", obtstat);
router.get("/Estado/:Estado", BuscarStatus);
router.get("/:Proyecto_id",BuscarProyecto);

export default router;