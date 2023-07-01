import { Router } from "express";
import {adminToAlumn,
adminToMaest,
maestToAdmin,
maestToAlumn,
alumnToAdmin,
alumnToMaest} from "../controller/roles";
import { autorizar } from "../middleware/verify_token";

const router = Router();
router.get("/AdminToAlumn/:codigo",autorizar,adminToAlumn);
router.get("/AdminToMaest/:codigo",autorizar,adminToMaest);
router.get("/MaestToAdmin/:codigo",autorizar,maestToAdmin);
router.get("/MaestToAlumn/:codigo",autorizar,maestToAlumn);
router.get("/AlumnToAdmin/:codigo",autorizar,alumnToAdmin);
router.get("/AlumnToMaest/:codigo",autorizar,alumnToMaest);

export default router;