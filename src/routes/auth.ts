import { Router } from "express";
import { login } from "../controller/login";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.post("/",login);
router.get("/",autorizar,(req: any,res: any) => {
    const codigo=req.usuarioCodigo
    const rol=req.usuarioRol
    res.json({codigo,rol})
})

export default router;