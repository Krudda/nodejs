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
            const { count, rows } = await User.scope('activeUsers').findAndCountAll({
                attributes: ['username', 'email'],
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
            const user = await User.scope('activeUsers').findByPk(id);
            if (!user) {
                return new Error(`User with ID: ${id} not found.`);
            }
            return { username: user.username, email: user.email };
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateUser(user) {
        const { id, ...userFields} = user;
        try {
            return await db.transaction(async () => {
                const checkUserError = await this.getUser(id);

                if (checkUserError instanceof Error) {
                    return checkUserError;
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
                const checkUserError = await this.getUser(id);

                if (checkUserError instanceof Error) {
                    return checkUserError;
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
