import { checkRequestStatus, requestErrorHandler } from "../controllerUtils.js";
import GroupService from "../../services/groupService.js";

export const createGroupController = () => async (req, res, next) => {
    try {
        const group = await GroupService.createGroup(req.body);
        res.json(group);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const getGroupController = () => async (req, res, next) => {
    try {
        const { id } = req.params;
        const requestResult = await GroupService.getGroup(id);
        checkRequestStatus(requestResult, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const getGroupsController = () => async (req, res, next) => {
    const { offset = process.env.REQUEST_OFFSET, limit = process.env.REQUEST_LIMIT } = req.query;

    try {
        const groups = await GroupService.getGroups(offset, limit);
        res.json(groups);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const updateGroupController = () => async (req, res, next) => {
    try {
        const requestResult = await GroupService.updateGroup(req.body);
        checkRequestStatus(requestResult, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}

export const deleteGroupController = () => async (req, res, next) => {
    try {
        const requestResult = await GroupService.deleteGroup(req.body);
        checkRequestStatus(requestResult, res);
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        return next(error);
    }
}


