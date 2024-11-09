import { Router } from "express";
import * as controller from "../controllers/fostering.controller"

const router: Router = Router();

router.get("/", controller.getFostering);

router.get("/all", controller.getAllFostering);

router.post("/create", controller.createFostering);

router.patch("/update/:id", controller.updateFostering);

router.delete("/delete/:id", controller.deleteFostering);




export const fosteringRouter: Router = router;