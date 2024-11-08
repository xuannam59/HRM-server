import { Router } from "express";
import * as controller from "../controllers/department.controller"

const router: Router = Router();

router.get("/", controller.getDepartments);

router.get("/all", controller.getAllDepartment);

router.post("/create", controller.createDepartment);

router.put("/update/:id", controller.updateDepartment);

router.delete("/delete/:id", controller.deleteDepartment);




export const departmentRouter: Router = router;