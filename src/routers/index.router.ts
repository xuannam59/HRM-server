import { Express } from "express";
import { userRouter } from "./user.router";
import { employeeRouter } from "./employee.router";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { scheduleRouter } from "./schedule.router";
import { applicationRouter } from "./application.router";
import { collaborateRouter } from "./collaborate.router";
import { fosteringRouter } from "./fostering.router";
import { rewardDisciplineRouter } from "./rewardDiscipline.router";

const routerApiV1 = (app: Express) => {
    const api: string = "/api/v1"

    app.use(api + "/auth", userRouter);

    app.use(verifyToken);
    app.use(api + "/employees", employeeRouter);

    app.use(api + "/schedules", scheduleRouter);

    app.use(api + "/applications", applicationRouter);

    app.use(api + "/collaborates", collaborateRouter);

    app.use(api + "/fostering", fosteringRouter);

    app.use(api + "/reward-discipline", rewardDisciplineRouter);
}

export default routerApiV1;