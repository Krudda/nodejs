import db from '../db/db.js';
import User from "../models/User.js";

class UserService {
    async createUser(userData) {
        try {
            return await db.transaction(async () => {
                return await User.create(userData);
            })
        }
        catch (err) {
            throw new Error(err)
        }

    }

    async getAutoSuggestUsers(offset, limit) {
        try {
            const { count, rows } = await User.findAndCountAll({
                attributes: ['username', 'email'],
                where: {
                    isDeleted: 'false'
                },
                offset,
                limit
            });
            return  { count, rows };
        } catch (err) {
            throw new Error(err)
        }
    }

    async getUser(id) {
        try {
            const user = await User.findByPk(id);
            return user.isDeleted ? null : { username: user.username, email: user.email };
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateUser(user) {
        const { id, ...userFields} = user;
        try {
            return await db.transaction(async () => {
                const isUserExist = await this.getUser(id);

                if (!isUserExist) {
                    return new Error(`User with ID: ${id} not found.`);
                }

                await User.update({...userFields}, {
                    where: { id }
                });
                return `User with ID ${id} is updated.`;
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteUser(id) {
        try {
            return await db.transaction(async () => {
                const isUserExist = await this.getUser(id);

                if (!isUserExist) {
                    return new Error(`User with ID: ${id} not found.`);
                }

                await User.update({ isDeleted: true }, {
                    where: { id }
                });
                return `User with ID ${id} is deleted.`;
            })
        } catch (err) {
            return new Error(err.message)
        }
    }
}

export default new UserService();
