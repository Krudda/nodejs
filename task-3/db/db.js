import { Sequelize } from 'sequelize';
import { createNamespace } from 'cls-hooked';
import * as dotenv from "dotenv";

dotenv.config();

const session = createNamespace('session');
Sequelize.useCLS(session);

const db = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_TYPE,
    logging: console.log,
    timezone: '+00:00',
    define: {
        timestamps: false
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    }
);

export default db;


