import { checkRequestStatus, requestErrorHandler } from "../controllerUtils.js";
import GroupService from "../../services/groupService.js";

export const createGroupController = () => async (req, res, next) => {
    try {
        const group = await GroupService.createGroup(req.body);
        res.json(group);
        req.log.info('Groups: Create group request conditions');
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        req.log.error({error: error.message}, 'Groups: Create group request failed');
        return next(error);
    }
}

export const getGroupController = () => async (req, res, next) => {
    try {
        const { id } = req.params;
        const requestResult = await GroupService.getGroup(id);
        checkRequestStatus(requestResult, res);
        req.log.info('Groups: Get group request conditions');
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        req.log.error({error: error.message}, 'Groups: Get group request failed');
        return next(error);
    }
}

export const getGroupsController = async (req, res, next) => {
    const { offset = process.env.REQUEST_OFFSET, limit = process.env.REQUEST_LIMIT } = req.query;

    const maximumLimit = Number(limit) > 10 ? 10 : limit;

    // const groups = await GroupService.getGroups(offset, maximumLimit);
    //
    // if (!groups) {
    //     return next(error);
    // }

    // res.json(groups);
    // req.log.info('Groups: Get groups request conditions');

    try {
        const groups = await GroupService.getGroups(offset, maximumLimit);
        res.json(groups);
        req.log.info('Groups: Get groups request conditions');
        return next();
    } catch (error) {
        // requestErrorHandler(error, res);
        // req.log.error({error: error.message}, 'Groups: Get groups request failed');
        return next(error);
    }
}

export const updateGroupController = () => async (req, res, next) => {
    try {
        const requestResult = await GroupService.updateGroup(req.body);
        checkRequestStatus(requestResult, res);
        req.log.info('Groups: Update group request conditions');
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        req.log.error({error: error.message}, 'Groups: Update group request failed');
        return next(error);
    }
}

export const deleteGroupController = () => async (req, res, next) => {
    try {
        const requestResult = await GroupService.deleteGroup(req.params.id);
        checkRequestStatus(requestResult, res);
        req.log.info('Groups: Delete group request conditions');
        return next();
    } catch (error) {
        requestErrorHandler(error, res);
        req.log.error({error: error.message}, 'Groups: Delete group request failed');
        return next(error);
    }
}


