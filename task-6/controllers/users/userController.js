import UserService from '../../services/userService.js';
import TokenService from "../../services/tokenService.js";

export const createUserController = async (req, res, next) => {
    try {
        const user = await UserService.createUser(req.body);
        res.cookie('refreshToken', user.refreshToken, { maxAge: 30000, httpOnly: true});
        res.json(user);
        req.log.info({ data: req.body }, 'Users: Create user request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = await UserService.loginUser(email, password);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 60 * 1000, httpOnly: true});
        res.json(userData);
        req.log.info({ data: req.body }, 'Users: Login user request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
};

export const logoutController = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const logoutResult = await UserService.logoutUser(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(logoutResult);
        return next();
    } catch (error) {
        return next(error);
    }
};

export const tokenRefreshController = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const userData = await UserService.refreshUserToken(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 60 * 1000, httpOnly: true});
        res.json(userData);
        req.log.info('Users: Refresh Token.');
        return next();
    } catch (error) {
        return next(error);
    }
};

export const refreshTokenController = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const user = await TokenService.refresh(refreshToken);

        res.cookie('refreshToken', user.refreshToken, { maxAge: 30000, httpOnly: true});
        res.json(user);
        req.log.info({ data: req.body }, 'Users: Create user request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}

export const getUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserService.getUser(id);
        res.json(user);
        req.log.info('Users: Get user request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}

export const getSuggestedUsersController = async (req, res, next) => {
    const { offset = process.env.REQUEST_OFFSET, limit = process.env.REQUEST_LIMIT } = req.query;

    const maximumLimit = Number(limit) > 10 ? 10 : limit;

    try {
        const suggestedUsers = await UserService.getAutoSuggestUsers(offset, maximumLimit);
        res.json(suggestedUsers);
        req.log.info('Users: Get suggested users request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}

export const updateUserController = async (req, res, next) => {
    try {
        const user = await UserService.updateUser(req.body);
        res.json(user);
        req.log.info('Users: Update user request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}

export const deleteUserController = async (req, res, next) => {
    try {
        const user = await UserService.deleteUser(req.params.id);
        res.json(user);
        req.log.info('Users: Delete user request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}

export const addUserToGroupController = async (req, res, next) => {
    const { userId, groupId } = req.body;
    try {
        const requestResult = await UserService.addUserToGroup(userId, groupId);
        res.json(requestResult);
        req.log.info('Users: Add user to group request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}
