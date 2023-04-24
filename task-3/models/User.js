import { DataTypes, Model } from 'sequelize';
import db from '../db/db.js';

class User extends Model {

}

const model = User.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    sequelize: db,
    tableName: 'users',
});
export default model;