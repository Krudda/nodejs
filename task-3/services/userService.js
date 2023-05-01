import { v4 as generateId } from 'uuid';
import db, {openConnection, closeConnection} from '../db/db.js'
import Users from '../models/User.js';
import User from "../models/User.js";

class UserService {
    async createUser(userData) {
        try {
            const user = await db.transaction(async () => {
                return await User.create(userData);
            })
            return user;
        }
        catch (err) {
            throw new Error(err)
        }

    }

    async getAutoSuggestUsers(search, limit) {
        try {
            const users = await db.transaction(async () => {
                return await User.findAll({
                    attributes: ['username', 'email'],
                    where: {
                        isDeleted: 'false'
                    }
                });
            })
            return users || [];
        } catch (err) {
            throw new Error(err)
        }
    }

    async getUser(id) {
        try {
            const user = await User.findByPk(id);
            return user ? user : `User with ID ${id} not found`;
        } catch (err) {
            throw new Error(err)
        }
    }

    async updateUser(user) {
        // try {
        //     await User.update({ lastName: "Doe" }, {
        //         where: {
        //             lastName: null
        //         }
        //     });
        // }
    }

    async deleteUser(id) {
        try {
            return await db.transaction(async () => {
                const user = await User.findByPk(id);

                if (!user || user.isDeleted) {
                    return new Error(`Cannot delete user with ID: ${id}. User not found.`);
                };

                await User.update({ isDeleted: true }, {
                    where: {
                        id: id
                    }
                });
                return `User with ID ${id} is deleted`;
            })
        } catch (err) {
            throw new Error(err)
        }
    }
}

export default new UserService();
