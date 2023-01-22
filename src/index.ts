import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import {InversifyExpressServer} from "inversify-express-utils";

import logger from "./utils/logger";
import Database from "./utils/databaseConnection";
import {container} from "./inversify.config";

require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:4200",
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
const server = new InversifyExpressServer(container, null, {rootPath: "/api"});
server.setConfig((app) => {
  // add your express middlewares here
});
app.use(server.build());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
  logger.info(`Server listening on port ${PORT}!`);
});
