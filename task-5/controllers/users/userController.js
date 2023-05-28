import UserService from '../../services/userService.js';
import { checkRequestStatus, requestErrorHandler } from "../controllerUtils.js";

export const createUserController = () => async (req, res, next) => {
    try {
        const user = await UserService.createUser(req.body);
        res.json(user);
        req.log.info('Users: Create user request conditions');
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        req.log.error({error: error.message}, 'Users: Create user request failed');
        return next(error);
    }
}

export const getUserController = () => async (req, res, next) => {
    try {
        const { id } = req.params;
        const requestResult = await UserService.getUser(id);
        checkRequestStatus(requestResult, res);
        req.log.info('Users: Get user request conditions');
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        req.log.error({error: error.message}, 'Users: Get user request failed');
        return next(error);
    }
}

export const getSuggestedUsersController = () => async (req, res, next) => {
    const { offset = process.env.REQUEST_OFFSET, limit = process.env.REQUEST_LIMIT } = req.query;

    const maximumLimit = Number(limit) > 10 ? 10 : limit;

    try {
        const suggestedUsers = await UserService.getAutoSuggestUsers(offset, maximumLimit);
        req.log.info('Users: Get suggested users request conditions');
        res.json(suggestedUsers);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        req.log.error({error: error.message}, 'Users: Get suggested users request failed');
        return next(error);
    }
}

export const updateUserController = () => async (req, res, next) => {
    try {
        const requestResult = await UserService.updateUser(req.body);
        checkRequestStatus(requestResult, res);
        req.log.info('Users: Update user request conditions');
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        req.log.error({error: error.message}, 'Users: Update user request failed');
        return next(error);
    }
}

export const deleteUserController = () => async (req, res, next) => {
    try {
        const requestResult = await UserService.deleteUser(req.params.id);
        checkRequestStatus(requestResult, res);
        req.log.info('Users: Delete user request conditions');
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        req.log.error({error: error.message}, 'Users: Delete user request failed');
        return next(error);
    }
}

export const addUserToGroupController = () => async (req, res, next) => {
    const { userId, groupId } = req.body;
    try {
        const requestResult = await UserService.addUserToGroup(userId, groupId);
        checkRequestStatus(requestResult, res);
        req.log.info('Users: Add user to group request conditions');
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        req.log.error({error: error.message}, 'Users: Add user to group request failed');
        return next(error);
    }
}
