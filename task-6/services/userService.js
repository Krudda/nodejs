import bcrypt from 'bcrypt';
import db from '../db/db.js';
import User from "../models/User.js";
import Group from "../models/Group.js";
import { InvalidUserRequestError } from "../errors/index.js";
import {checkData} from "./utils.js";
import TokenService from "./tokenService.js";
import {InvalidTokenRequestError} from "../errors/invalidTokenRequestError.js";

class UserService {
    async createUser(userData) {
        try {
            const { password, ...userFields } = userData;
            const isUserExist = await User.findOne({ where: { email: userFields.email } });
            if( isUserExist ) {
                throw new InvalidUserRequestError(`User with email ${userFields.email} is already exist.`);
            }
            const hashPassword = await bcrypt.hash(password, 3);

            const user = await User.create({ password: hashPassword, ...userFields });
            const tokens = await TokenService.generateTokens(userFields);
            await TokenService.saveToken(user.id, tokens.refreshToken);
            return { message: 'User successfully created.', ...tokens };
        }
        catch (err) {
            if (err instanceof InvalidUserRequestError) {
                throw err;
            }
            else {
                throw new InvalidUserRequestError('Failed to add user.');
            }
        }

    }

    async refreshUserToken(refreshToken) {
        if (!refreshToken) {
            throw new InvalidTokenRequestError('Unauthorized.');
        }
        try {
            const userData = this.validateRefreshToken(refreshToken);
            const tokenFromDB = await this.findToken(refreshToken);

            if (!userData || !tokenFromDB) {
                throw new InvalidTokenRequestError('Unauthorized.');
            }

            const user = await User.findByPk(userData.id);

            const tokens = await TokenService.generateTokens(user);
            await TokenService.saveToken(user.id, tokens.refreshToken);

            return { user, ...tokens };
        } catch (err) {
            throw new InvalidUserRequestError('Failed to fetch user.');
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
            checkData(user);
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
                checkData(isUserExist);
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
                checkData(isUserExist);
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
                checkData(user);
                checkData(group);
                await user.addGroup(groupId);
                return `User with ID ${userId} was added to Group with ID ${groupId}.`;
            })
        } catch (err) {
            throw new InvalidUserRequestError('Failed to add user to the group.');
        }
    }
}

export default new UserService();
