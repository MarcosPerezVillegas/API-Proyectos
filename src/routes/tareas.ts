import { Router } from "express";
import { adddoc, dropdoc, obtdoc } from "../controller/tareas";
import { autorizar } from "../middleware/verify_token";

const router = Router();

router.post("/", autorizar, adddoc);
router.delete("/:id", autorizar, dropdoc);
router.get("/", obtdoc);

export default router;