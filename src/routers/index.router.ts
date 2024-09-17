import { Express } from "express";
import { userRouter } from "./user.router";
import { teacherRouter } from "./teacher.router";
import { verifyToken } from "../../middlewares/verifyToken.middleware";

const routerApiV1 = (app: Express) => {
    const api: string = "/api/v1"

    app.use(api + "/auth", userRouter);

    app.use(api + "/school", verifyToken, teacherRouter);
}

export default routerApiV1;