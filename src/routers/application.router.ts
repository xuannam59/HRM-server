import { Router } from "express";
import * as controller from "../controllers/application.controller"
const router: Router = Router();

router.get("/", controller.getApplications);

router.get("/:id", controller.getApplicationById);

router.post("/create", controller.createApplication);

router.patch("/update/:id", controller.updateApplication);

router.delete("/delete/:id", controller.deleteApplication);

export const applicationRouter: Router = router;