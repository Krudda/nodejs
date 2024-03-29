import jwt from 'jsonwebtoken';
import Token from "../models/Token.js";
import {InvalidTokenRequestError, InvalidUserRequestError} from "../errors/index.js";

class TokenService {
    async generateTokens(payload) {
        try {
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '10m' });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30m' });
            return { accessToken, refreshToken };
        }
        catch (err) {
            throw InvalidUserRequestError('Failed to generate token.');
        }
    }

    async saveToken(userId, refreshToken) {
        try {
            const tokenData = await Token.findByPk(userId);
            if (tokenData) {
                return await Token.update({ refreshToken }, { where: { user: userId }});
            }
            return await Token.create({ user: userId, refreshToken });
        }
        catch (err) {
            throw new InvalidTokenRequestError('Failed to save token.');
        }
    }
    async removeToken(refreshToken) {
        try {
            await Token.destroy({ where: { refreshToken }});
            return 'Removed';
        }
        catch (err) {
            throw new InvalidTokenRequestError('Failed to remove token.');
        }
    }
    
    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        }
        catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        }
        catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        return await Token.findOne({ where: { refreshToken } });
    }
}

export default new TokenService();
