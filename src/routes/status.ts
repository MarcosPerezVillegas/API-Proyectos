import { Router } from "express";
import { addstat, dropstat, obtstat } from "../controller/status";
import { autorizar } from "../middleware/verify_token";

const router = Router();

router.post("/",autorizar, addstat);
router.delete("/:Proyecto_id",autorizar, dropstat);
router.get("/", obtstat);

export default router;