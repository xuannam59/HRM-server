import { Router } from "express";
import * as controller from "../controllers/schedule.controller"

const router: Router = Router();

router.get("/", controller.getSchedules);

router.get("/teachers", controller.getTeachers);

router.get("/:userId", controller.getSchedulesById);

router.post("/create", controller.createSchedule);

router.patch("/update/:id", controller.updateSchedule);

router.delete("/delete/:id", controller.deleteSchedule);


export const scheduleRouter: Router = router;