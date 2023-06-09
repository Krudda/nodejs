import UserService from '../../services/userService.js';
import { checkRequestStatus, requestErrorHandler } from "../controllerUtils.js";

export const createUserController = () => async (req, res, next) => {
    try {
        const user = await UserService.createUser(req.body);
        res.json(user);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const getUserController = () => async (req, res, next) => {
    try {
        const { id } = req.params;
        const requestResult = await UserService.getUser(id);
        checkRequestStatus(requestResult, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const getSuggestedUsersController = () => async (req, res, next) => {
    const { offset = process.env.REQUEST_OFFSET, limit = process.env.REQUEST_LIMIT } = req.query;

    const maximumLimit = Number(limit) > 10 ? 10 : limit;

    try {
        const suggestedUsers = await UserService.getAutoSuggestUsers(offset, maximumLimit);
        res.json(suggestedUsers);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const updateUserController = () => async (req, res, next) => {
    try {
        const requestResult = await UserService.updateUser(req.body);
        checkRequestStatus(requestResult, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const deleteUserController = () => async (req, res, next) => {
    try {
        const requestResult = await UserService.deleteUser(req.params.id);
        checkRequestStatus(requestResult, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const addUserToGroupController = () => async (req, res, next) => {
    const { userId, groupId } = req.body;
    try {
        const requestResult = await UserService.addUserToGroup(userId, groupId);
        checkRequestStatus(requestResult, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}
