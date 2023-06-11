import * as dotenv from 'dotenv';
import express from 'express';
import loggerMiddleware from "./middlewares/loggerMiddleware.js";
import router from './routes/router.js';
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = express();

// process.on('uncaughtException', (err) => {
//     console.log('Caught exception. Exiting. error: ' + err + ', stack: ' + err.stack)
//     // log.warn('Caught exception. Exiting. error: ' + err + ', stack: ' + err.stack);
//     process.exit(1);
// });

server.use(express.json());
server.use(loggerMiddleware);
server.use('/', router);
server.use(errorHandlingMiddleware);

async function startApp() {
    try {
        server.listen(PORT, () => { console.log(`Server works on port ${PORT}`); });
    } catch (error) {
        console.log('App start error', error);
    }
    // console.log(xs)
}

startApp();
