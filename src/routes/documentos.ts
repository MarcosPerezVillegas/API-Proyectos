import { Router } from "express";
import { adddoc, dropdoc, obtdoc } from "../controller/documentos";

const router = Router();

router.post("/", adddoc);
router.delete("/:id", dropdoc);
router.get("/", obtdoc);

export default router;