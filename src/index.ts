import 'reflect-metadata';
import express from 'express';
import {InversifyExpressServer} from 'inversify-express-utils';

import logger from "./utils/logger";

import Database from "./utils/databaseConnection";
import {container} from "./inversify.config";

require('dotenv').config();

const app = express();
const server = new InversifyExpressServer(container, null, {rootPath: '/api'});
server.setConfig((app) => {
    // add your express middlewares here
});
app.use(server.build());
Database.connect();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server listening on port 4000!');
    logger.info("Server listening on port 4000!")
});
