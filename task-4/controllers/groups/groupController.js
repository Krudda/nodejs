import { checkRequestStatus, requestErrorHandler } from "../controllerUtils.js";
import GroupService from "../../services/groupService.js";

export const createGroupController = () => async (req, res, next) => {
    try {
        const user = await GroupService.createGroup(req.body);
        res.json(user);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const getGroupController = () => async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await GroupService.getGroup(id);
        checkRequestStatus(result, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const getGroupsController = () => async (req, res, next) => {
    const { offset = process.env.USERS_OFFSET, limit = process.env.USERS_LIMIT } = req.query;

    try {
        const suggestedUsers = await GroupService.getGroups(offset, limit);
        res.json(suggestedUsers);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const updateGroupController = () => async (req, res, next) => {
    try {
        const result = await GroupService.updateGroup(req.body);
        checkRequestStatus(result, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const deleteGroupController = () => async (req, res, next) => {
    try {
        const result = await GroupService.deleteGroup(req.body);
        checkRequestStatus(result, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}


