import express from 'express';
import logger from "./utils/logger";

import Database from "./utils/databaseConnection";
const app = express();

Database.connect();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(4000, () => {
    console.log('Server listening on port 4000!');
    logger.info("Server listening on port 4000!")
});
