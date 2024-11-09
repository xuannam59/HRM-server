import { Router } from "express";
import * as controller from "../controllers/collaborate.controller"

const router: Router = Router();

router.get("/", controller.getCollaborates);

router.get("/all", controller.getAllCollaborates);

router.post("/create", controller.createCollaborate);

router.patch("/update/:id", controller.updateCollaborate);

router.delete("/delete/:id", controller.deleteCollaborate);


export const collaborateRouter: Router = router;