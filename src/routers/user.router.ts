import { Router } from "express";
import * as controller from "../controllers/user.controller";


const router: Router = Router();

// [GET] /api/v1/auth
router.get("/", controller.getUsers);

// [GET] /api/v1/auth/not-account
router.get("/not-account", controller.getNotAccount);

//[POST] /api/v1/auth/login
router.post("/login", controller.login);

//[POST] /api/v1/auth/register
router.post("/register", controller.register);

// [PATCH]/api/v1/auth/update/:id
router.patch("/update/:id", controller.update);

// [DELETE]/api/v1/auth/delete/:id
router.delete("/delete/:id", controller.deleteUser);

//[POST] /api/v1/aut/google-login
router.post("/google-login", controller.loginWithGoogle);

// /api/v1/aut/refresh-token
router.get("/refresh-token", controller.refreshToken);

export const userRouter: Router = router;