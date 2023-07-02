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
            const token = await Token.create({ user: userId, refreshToken });
            return token;
        }
        catch (err) {
            throw new InvalidTokenRequestError('Failed to save token.');
        }
    }
    
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        return await Token.findOne({ where: { refreshToken } });
    }

    // async logout() {
    //     try {
    //         const { count, rows } = await User.scope('activeUsers').findAndCountAll({
    //             attributes: ['username', 'email'],
    //         });
    //         return  { count, rows };
    //     } catch (err) {
    //         throw new InvalidUserRequestError('Failed to fetch users.');
    //     }
    // }

    // async refresh(refreshToken) {
    //     if (!refreshToken) {
    //         throw new InvalidTokenRequestError('Unauthorized.');
    //     }
    //     try {
    //         const userData = this.validateRefreshToken(refreshToken);
    //         const tokenFromDB = await this.findToken(refreshToken);
    //
    //         if (!userData || !tokenFromDB) {
    //             throw new InvalidTokenRequestError('Unauthorized.');
    //         }
    //
    //         const user = await User.findByPk(userData.id);
    //
    //
    //         return { username: user.username, email: user.email };
    //     } catch (err) {
    //         throw new InvalidUserRequestError('Failed to fetch user.');
    //     }
    // }
}

export default new TokenService();
