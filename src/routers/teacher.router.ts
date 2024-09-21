import { Router } from "express";
import * as controller from "../controllers/teacher.controller";

const router: Router = Router();

router.get("/", controller.getTeachers);

router.post("/create", controller.createTeacher);

router.put("/update/:id", controller.updateTeacher);

router.delete("/delete/:id", controller.deleteTeacher);

export const teacherRouter: Router = router;