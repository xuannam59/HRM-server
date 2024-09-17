import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./src/config/database.config";
import routerApiV1 from "./src/routers/index.router";
import cors from "cors";
dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

// router
routerApiV1(app);

// connect database
database.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        })
    }).catch((error) => {
        console.log(error);
    });
