import { DataTypes, Model } from 'sequelize';
import db from '../db/db.js';

class Token extends Model {}

const tokenModel = Token.init({
    user: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
}, {
    sequelize: db,
    tableName: 'Tokens',
    modelName: 'Token'
});

export default tokenModel;