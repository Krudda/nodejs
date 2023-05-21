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
        const result = await UserService.getUser(id);
        checkRequestStatus(result, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const getSuggestedUsersController = () => async (req, res, next) => {
    const { offset = process.env.USERS_OFFSET, limit = process.env.USERS_LIMIT } = req.query;

    try {
        const suggestedUsers = await UserService.getAutoSuggestUsers(offset, limit);
        res.json(suggestedUsers);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const updateUserController = () => async (req, res, next) => {
    try {
        const result = await UserService.updateUser(req.body);
        checkRequestStatus(result, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}
export const deleteUserController = () => async (req, res, next) => {
    try {
        const result = await UserService.deleteUser(req.params.id);
        checkRequestStatus(result, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}
