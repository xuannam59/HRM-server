import { Router } from "express";
import * as controller from "../controllers/schedule.controller"

const router: Router = Router();

router.get("/", controller.getSchedules);

router.get("/teachers", controller.getTeachers);

router.get("/:userId", controller.getSchedulesById);

router.post("/create", controller.createSchedule);

router.patch("/update/:id", controller.updatePosition);

router.delete("/delete/:id", controller.deletePosition);


export const scheduleRouter: Router = router;