import { Express } from "express";
import { UserRouter } from "./user.router";

const Router = (app: Express) => {
    const api: string = "/api/v1"
    app.use(api + "/auth", UserRouter);
}

export default Router;