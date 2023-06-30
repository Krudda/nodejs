import jwt from 'jsonwebtoken';
import db from '../db/db.js';
import Token from "../models/Token.js";
import Group from "../models/Group.js";
import { InvalidUserRequestError } from "../errors/index.js";
import {checkData} from "./utils.js";
import User from "../models/User.js";
import {InvalidTokenRequestError} from "../errors/invalidTokenRequestError.js";

class TokenService {
    async generateTokens(payload) {
        try {
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '3m' });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30m' });
            // await Token.create(userData);
            return { accessToken, refreshToken };
        }
        catch (err) {
            throw new InvalidTokenRequestError('Failed to generate token.');
        }
    }

    async saveToken(userId, refreshToken) {
        try {
            const tokenData = await Token.findByPk(userId);
            if (tokenData) {
                return await Token.update({ refreshToken }, {
                    where: { userId }
                });
            }
            const token = Token.create({ user: userId, refreshToken });
            return token;
        }
        catch (err) {
            throw new InvalidTokenRequestError('Failed to save token.');
        }
    }

    async logout() {
        try {
            const { count, rows } = await User.scope('activeUsers').findAndCountAll({
                attributes: ['username', 'email'],
            });
            return  { count, rows };
        } catch (err) {
            throw new InvalidUserRequestError('Failed to fetch users.');
        }
    }

    async refresh(id) {
        try {
            const user = await User.scope('activeUsers').findByPk(id);
            checkData(user);
            return { username: user.username, email: user.email };
        } catch (err) {
            throw new InvalidUserRequestError('Failed to fetch user.');
        }
    }
}

export default new TokenService();
