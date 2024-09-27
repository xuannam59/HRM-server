import { Router } from "express";
import * as controller from "../controllers/level.controller"
const router: Router = Router();

router.get("/", controller.getLevels);

router.get("/all", controller.getAllLevel);

router.post("/create", controller.createLevel);

router.put("/update/:id", controller.updateLevel);

router.delete("/delete/:id", controller.deleteLevel);

export const levelRouter: Router = router;