import { Router } from "express";
import * as controller from "../controllers/rewardDiscipline.controller"

const router: Router = Router();

router.get("/", controller.getRewardDiscipline);

router.get("/:userId", controller.getRewardDisciplineById);

router.post("/create", controller.createRewardDiscipline);

router.patch("/update/:id", controller.updateRewardDiscipline);

router.delete("/delete/:id", controller.deleteRewardDiscipline);


export const rewardDisciplineRouter: Router = router;