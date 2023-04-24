import { Sequelize } from 'sequelize';
import { createNamespace } from 'cls-hooked';
import * as dotenv from "dotenv";

dotenv.config();

export const namespace = createNamespace('ns');
Sequelize.useCLS(namespace);

const db = new Sequelize(
    process.env.USERS_TABLE_NAME,
    process.env.DB_USER_NAME,
    process.env.DB_USER_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_TYPE,
        logging: console.log,
        timezone: '+00:00',
        define: {
            timestamps: false
        }
    }
);

export function openConnection() {
    db.authenticate()
}

export function closeConnection() {
    db.close()
}

export default db;

