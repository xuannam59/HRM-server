import { Router } from "express";
import * as controller from "../controllers/employee.controller";

const router: Router = Router();

router.get("/", controller.getEmployees);

router.get("/all", controller.getAllEmployee);

router.post("/create", controller.createEmployee);

router.put("/update/:id", controller.updateEmployee);

router.delete("/delete/:id", controller.deleteEmployee);

router.get("/detail/:id", controller.employeeDetail);

export const employeeRouter: Router = router;