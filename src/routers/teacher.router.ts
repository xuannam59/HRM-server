import { Router } from "express";
import * as controller from "../controllers/teacher.controller";

const router: Router = Router();

router.get("/teachers", controller.getTeachers);

export const teacherRouter: Router = router;