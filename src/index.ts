import "reflect-metadata";
import express from "express";
import {Container} from "inversify";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import {InversifyExpressServer} from "inversify-express-utils";
import {createServer} from "http";

import logger from "./utils/logger";
import Database from "./utils/databaseConnection";

import {config} from "dotenv";
import UserModule from "./userModule/userModule";
import FoodModule from "./foodModule/foodModule";
import io from './socket'
import CartModule from "./cartModule/cartModule";
import {customRoutes} from "./routes/route";

config();
const corsOptions = {
    origin: process.env.ORIGIN_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
};

export const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer, {
//     // options
// });

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
Database.connect();

const container = new Container();
container.load(UserModule, FoodModule, CartModule);
const router = customRoutes(container)
const server = new InversifyExpressServer(container, router, {rootPath: "/api"});
server.setConfig((app) => {
    // add your express middlewares here
    // add body parser
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
});
app.use(server.build());

// Socket.io chat namespace
io.attach(httpServer)

// Close the database connection when the application is interrupted
// process.on('SIGINT', function () {
//     mongoose.connection.close().then(() => {
//         console.log("Properly close mongoose's connection")
//     }).catch((err: any) => {
//         console.log("Something went wrong", err)
//     })
// });

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
    logger.info(`Server listening on port ${PORT}!`);
});

export {container}
