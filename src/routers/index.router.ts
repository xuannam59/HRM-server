import { Express } from "express";
import { userRouter } from "./user.router";
import { employeeRouter } from "./employee.router";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { scheduleRouter } from "./schedule.router";
import { applicationRouter } from "./application.router";
import { specializeRouter } from "./specialize.router";
import { departmentRouter } from "./department.router";

const routerApiV1 = (app: Express) => {
    const api: string = "/api/v1"

    app.use(api + "/auth", userRouter);

    // app.use(verifyToken);
    app.use(api + "/employees", employeeRouter);

    app.use(api + "/schedules", scheduleRouter);

    app.use(api + "/applications", applicationRouter);

    app.use(api + "/specializes", specializeRouter);

    app.use(api + "/salaries", departmentRouter);
}

export default routerApiV1;