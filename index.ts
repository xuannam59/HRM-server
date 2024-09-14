import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database.config";
dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 3001;


// connect database
database.connect();


app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})