import { Router } from "express";
import * as controller from "../controllers/salary.controller"

const router: Router = Router();

router.get("/", controller.getSalaries);

router.get("/:userId", controller.getSalariesById);

router.post("/create", controller.createSalary);

router.patch("/update/:id", controller.updateSalary);

router.delete("/delete/:id", controller.deleteSalary);


export const salaryRouter: Router = router;