import bcrypt from 'bcrypt';
import db from '../db/db.js';
import User from "../models/User.js";
import Group from "../models/Group.js";
import { InvalidUserRequestError, InvalidTokenRequestError } from "../errors/index.js";
import { checkData } from "./utils.js";
import TokenService from "./tokenService.js";

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

    async loginUser(email, password) {
        try {
            const userData = await User.findOne({ where: { email } });
            const user = userData.dataValues;
            if( !user ) {
                throw new InvalidUserRequestError(`User not found.`);
            }

            const { password: userPassword, ...userFields } = user;
            const isPasswordsEqual = await bcrypt.compare(password, userPassword);
            if(!isPasswordsEqual) {
                throw new InvalidUserRequestError(`Incorrect password.`);
            }

            const tokens = await TokenService.generateTokens(userFields);
            await TokenService.saveToken(user.id, tokens.refreshToken);

            return { message: `Welcome, ${user.username}.`, ...tokens };
        }
        catch (err) {
            throw new InvalidUserRequestError('Failed to login.');
        }
    }

    async logoutUser(refreshToken) {
        try {
            const token = await TokenService.removeToken(refreshToken);
            return { message: `Goodbye!`, token };
        }
        catch (err) {
            throw new InvalidUserRequestError('Failed to logout.');
        }
    }

    async refreshUserToken(refreshToken) {
        try {
            if (!refreshToken) {
                throw InvalidTokenRequestError.UnauthorizedError();
            }
            const userData = TokenService.validateRefreshToken(refreshToken);
            const tokenData = await TokenService.findToken(refreshToken);
            const tokenFromDB = tokenData.dataValues;
            if (!userData || !tokenFromDB) {
                throw InvalidTokenRequestError.UnauthorizedError();
            }

            const userFromDB = await User.findByPk(userData.id);
            const user = userFromDB.dataValues;
            const { password, ...userFields } = user;

            const tokens = await TokenService.generateTokens(userFields);
            await TokenService.saveToken(user.id, tokens.refreshToken);

            return { userFields, ...tokens };
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
