import { Express } from "express";
import { userRouter } from "./user.router";
import { employeeRouter } from "./employee.router";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { positionRouter } from "./position.router";
import { levelRouter } from "./level.router";
import { specializeRouter } from "./specialize.router";
import { departmentRouter } from "./department.router";

const routerApiV1 = (app: Express) => {
    const api: string = "/api/v1"

    app.use(api + "/auth", userRouter);

    app.use(verifyToken);
    app.use(api + "/employees", employeeRouter);

    app.use(api + "/positions", positionRouter);

    app.use(api + "/levels", levelRouter);

    app.use(api + "/specializes", specializeRouter);

    app.use(api + "/departments", departmentRouter);
}

export default routerApiV1;