import { DataTypes, Model } from 'sequelize';
import db from '../db/db.js';
import User from "./User.js";

class Token extends Model {}

const tokenModel = Token.init({
    user: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    sequelize: db,
    tableName: 'Tokens',
    modelName: 'Token'
});

export default tokenModel;