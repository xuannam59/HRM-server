import { Router } from "express";
import * as controller from "../controllers/position.controller"

const router: Router = Router();

router.get("/", controller.getPositions);

router.get("/all", controller.getAllPosition);

router.post("/create", controller.createPosition);

router.put("/update/:id", controller.updatePosition);

router.delete("/delete/:id", controller.deletePosition);


export const positionRouter: Router = router;