import { Router } from "express";
import * as controller from "../controllers/user.controller";


const router: Router = Router();

// [GET] /api/ve/auth
router.get("/", controller.getUsers);

//[POST] /api/v1/auth/login
router.post("/login", controller.login);

//[POST] /api/v1/auth/register
router.post("/register", controller.register);

//[POST] /api/v1/aut/google-login
router.post("/google-login", controller.loginWithGoogle);

// /api/v1/aut/refresh-token
router.get("/refresh-token", controller.refreshToken);

export const userRouter: Router = router;