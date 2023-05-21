import { DataTypes, Model } from 'sequelize';
import db from '../db/db.js';

class Group extends Model {}

const permissions = [
    'READ',
    'WRITE',
    'DELETE',
    'SHARE',
    'UPLOAD_FILES'
];

const model = Group.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    permission: {
        type: DataTypes.ENUM({
            values: permissions
        })
    }
}, {
    sequelize: db,
    tableName: 'Groups',
    modelName: 'Group'
});
export default model;