import { DataTypes, Model } from 'sequelize';
import db from '../db/db.js';
import User from "./User.js";
import Group from "./Group.js";

class UserGroup extends Model {}

const model = UserGroup.init({
    userGroupId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    sequelize: db,
    tableName: 'UserGroups',
    modelName: 'UserGroup'
});

export default model;