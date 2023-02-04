import "reflect-metadata";
import express from "express";
import {Container} from "inversify";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import {InversifyExpressServer} from "inversify-express-utils";

import logger from "./utils/logger";
import Database from "./utils/databaseConnection";

import {config} from "dotenv";
import UserModule from "./userModule/userModule";
import FoodModule from "./foodModule/foodModule";

config();
const corsOptions = {
    origin: process.env.ORIGIN_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
};

export const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
Database.connect();

const container = new Container();
container.load(UserModule, FoodModule);

const server = new InversifyExpressServer(container, null, {rootPath: "/api"});
server.setConfig((app) => {
    // add your express middlewares here
    // add body parser
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
});
app.use(server.build());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
    logger.info(`Server listening on port ${PORT}!`);
});
