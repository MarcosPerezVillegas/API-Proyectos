import { Router } from "express";
import { addtarea, droptarea, obttarea, updtarea, obttareaid, obttareapro} from "../controller/tareas";
import { autorizar } from "../middleware/verify_token";

const router = Router();

router.post("/", autorizar, addtarea);
router.delete("/:id", autorizar, droptarea);
router.put("/:id", autorizar, updtarea);
router.get("/", obttarea);
router.get("/:id", obttareaid);
router.get("/proyecto/:Proyecto_id", obttareapro);

export default router;