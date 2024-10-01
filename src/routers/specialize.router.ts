import { Router } from "express";
import * as controller from "../controllers/specialize.controller"

const router: Router = Router();

router.get("/", controller.getSpecializes);

router.get("/all", controller.getAllSpecialize);

router.post("/create", controller.createSpecialize);

router.put("/update/:id", controller.updateSpecialize);

router.delete("/delete/:id", controller.deleteSpecialize);


export const specializeRouter: Router = router;