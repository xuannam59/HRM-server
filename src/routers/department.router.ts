import { Router } from "express";
import * as controller from "../controllers/department.controller"

const router: Router = Router();

router.get("/", controller.getDepartments);

router.get("/all", controller.getAllDepartment);

router.get("/detail-employee/:idDepartment", controller.getDepartmentEmployee);

router.get("/detail-employee/list/employee", controller.getListEmployee);

router.post("/detail-employee/add", controller.addDepartmentEmployee);

router.post("/create", controller.createDepartment);

router.put("/update/:id", controller.updateDepartment);

router.delete("/delete/:id", controller.deleteDepartment);

router.delete("/detail-employee/delete/:id", controller.deleteDepartmentEmployee);




export const departmentRouter: Router = router;