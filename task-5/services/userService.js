import db from '../db/db.js';
import User from "../models/User.js";
import Group from "../models/Group.js";
import { InvalidUserRequestError } from "../errors/index.js";

class UserService {
    async createUser(userData) {
        try {
            await User.create(userData);
            return 'User successfully created.';
        }
        catch (err) {
            throw new InvalidUserRequestError('Failed to add user.');
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
            throw new InvalidUserRequestError('Failed to fetch users.');
        }
    }

    async getUser(id) {
        try {
            const user = await User.scope('activeUsers').findByPk(id);
            if (!user) {
                throw new Error();
            }
            return { username: user.username, email: user.email };
        } catch (err) {
            throw new InvalidUserRequestError('Failed to fetch user.');
        }
    }

    async updateUser(user) {
        const { id, ...userFields} = user;
        try {
            return await db.transaction(async () => {
                const isUserExist = await this.getUser(id);

                if (!isUserExist) {
                    throw new Error();
                }

                await User.update({...userFields}, {
                    where: { id }
                });
                return `User with ID ${id} is updated.`;
            })
        } catch (err) {
            throw new InvalidUserRequestError('Failed to update user.');
        }
    }

    async deleteUser(id) {
        try {
            return await db.transaction(async () => {
                const isUserExist = await this.getUser(id);

                if (!isUserExist) {
                    throw new Error();
                }

                await User.update({ isDeleted: true }, {
                    where: { id }
                });
                return `User with ID ${id} is deleted.`;
            })
        } catch (err) {
            throw new InvalidUserRequestError('Failed to delete user.');
        }
    }

    async addUserToGroup(userId, groupId) {
        try {
            return await db.transaction(async () => {
                const user = await User.scope('activeUsers').findByPk(userId);
                const group = await Group.findByPk(groupId);

                if (!user || !group) {
                    throw new Error();
                }

                await user.addGroup(groupId);
                return `User with ID ${userId} was added to Group with ID ${groupId}.`;
            })
        } catch (err) {
            throw new InvalidUserRequestError('Failed to add user to the group.');
        }
    }
}

export default new UserService();
