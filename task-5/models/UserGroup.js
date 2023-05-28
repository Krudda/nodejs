import { DataTypes, Model } from 'sequelize';
import db from '../db/db.js';

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