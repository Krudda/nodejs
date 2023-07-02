import {InvalidTokenRequestError} from "../errors/invalidTokenRequestError.js";
import TokenService from "../services/tokenService.js";

const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        console.log({authorizationHeader})
        if(!authorizationHeader) {
            return next(new InvalidTokenRequestError('Unauthorized.'));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        console.log({accessToken})
        if(!accessToken) {
            return next(new InvalidTokenRequestError('Unauthorized.'));
        }

        const userData = TokenService.validateAccessToken(accessToken);
        console.log({userData})
        if(!userData) {
            return next(new InvalidTokenRequestError('Unauthorized.'));
        }

        req.user = userData;
        next();
    }
    catch (err) {
        return next(new InvalidTokenRequestError('Unauthorized.'));
    }
}

export default authMiddleware;