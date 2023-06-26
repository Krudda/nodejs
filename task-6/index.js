import * as dotenv from 'dotenv';
import express from 'express';
import router from './routes/router.js';
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";
import logger from "./logger/logger.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = express();

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

server.use(express.json());
server.use(logger);
server.use('/', router);
server.use(errorHandlingMiddleware);

async function startApp() {
    try {
        server.listen(PORT, () => {
            console.log(`Server works on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server start error', error);
    }
}

startApp();
