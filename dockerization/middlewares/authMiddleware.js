import { InvalidTokenRequestError } from "../errors/index.js";
import TokenService from "../services/tokenService.js";

const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(InvalidTokenRequestError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) {
            return next(InvalidTokenRequestError.UnauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(InvalidTokenRequestError.ForbiddenError());
        }

        req.user = userData;
        next();
    }
    catch (err) {
        return next(InvalidTokenRequestError.UnauthorizedError());
    }
}

export default authMiddleware;