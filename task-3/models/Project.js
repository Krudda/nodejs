import { DataTypes, Model } from 'sequelize';
import db from '../db/db.js';
import User from "./User.js";

class Project extends Model {}

const model = Project.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        // references: {
        //     model: User,
        //     key: 'id'
        // }
    },
    project_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    }
}, {
    sequelize: db,
    tableName: 'projects',
});
export default model;