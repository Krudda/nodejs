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
        type: DataTypes.ARRAY(
            DataTypes.ENUM({
                values: permissions
            })
        ),
        allowNull: false,
    }
}, {
    sequelize: db,
    tableName: 'Groups',
    modelName: 'Group'
});
export default model;