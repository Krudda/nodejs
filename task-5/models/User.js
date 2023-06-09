import { DataTypes, Model } from 'sequelize';
import db from '../db/db.js';
import Group from "./Group.js";
import userGroup from "./UserGroup.js";

class User extends Model {}

const userModel = User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [2, 20]
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    scopes: {
        activeUsers(){
            return {
                where: { isDeleted: false }
            }
        }
    },
    sequelize: db,
    tableName: 'Users',
    modelName: 'User'
});

userModel.belongsToMany(Group, { through: userGroup });
export default userModel;