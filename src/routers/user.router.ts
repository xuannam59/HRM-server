import { Router } from "express";
import * as controller from "../controllers/user.controller";


const router = Router();

//[POST] /api/v1/auth/login
router.post("/login", controller.login);

//[POST] /api/v1/auth/register
router.post("/register", controller.register);

export const UserRouter = router;