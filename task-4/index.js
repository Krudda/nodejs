import * as dotenv from 'dotenv';
import express from 'express';
import router from './routes/router.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = express();

server.use(express.json());
server.use('/', router);

async function startApp() {
    try {
        server.listen(PORT, () => { console.log(`Server works on port ${PORT}`); });
    } catch (error) {
        console.log('App start error', error);
    }
}

startApp();
