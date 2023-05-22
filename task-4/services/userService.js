import db from '../db/db.js';
import User from "../models/User.js";
import Group from "../models/Group.js";

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

    async addUserToGroup(userId, groupId) {
        try {
            // const syncTable = await UserGroup.sync({ alter: true });
            // console.log("The table for the User model was just (re)created!", {syncTable});

            return await db.transaction(async () => {
                const user = await User.scope('activeUsers').findByPk(userId);
                const group = await Group.findByPk(groupId);

                if (!user || !group) {
                    return new Error(
                        `${ !user ? `User` : `Group` } with ID:  ${ !user ? userId : groupId } not found.`
                    );
                }

                await user.addGroup(groupId);
                return `User with ID ${userId} was added to Group with ID ${groupId}.`;
            })
        } catch (err) {
            return new Error(err.message)
        }
    }
}

export default new UserService();
