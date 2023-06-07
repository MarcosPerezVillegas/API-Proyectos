import { Router } from "express";
import { adddoc, dropdoc, obtdoc, upddoc, obtuserdoc, obtexel, obtdocID } from "../controller/documentos";
import { autorizar } from "../middleware/verify_token";

const router = Router();

router.post("/", autorizar, adddoc);
router.delete("/:id", autorizar, dropdoc);
router.get("/", obtdoc);
router.get("/Usuarios/:id", obtuserdoc);
router.get("/ID/:id", obtdocID);
router.get("/Exel", obtexel);
router.put("/:id", autorizar, upddoc);

export default router;