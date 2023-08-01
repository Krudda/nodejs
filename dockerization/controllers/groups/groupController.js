import GroupService from "../../services/groupService.js";

export const createGroupController = async (req, res, next) => {
    try {
        const group = await GroupService.createGroup(req.body);
        res.json(group);
        req.log.info('Groups: Create group request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}

export const getGroupController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const group = await GroupService.getGroup(id);
        res.json(group);
        req.log.info('Groups: Get group request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}

export const getGroupsController = async (req, res, next) => {
    const { offset = process.env.REQUEST_OFFSET, limit = process.env.REQUEST_LIMIT } = req.query;
    const maximumLimit = Number(limit) > 10 ? 10 : limit;

    try {
        const groups = await GroupService.getGroups(offset, maximumLimit);
        res.json(groups);
        req.log.info('Groups: Get groups request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}

export const updateGroupController = async (req, res, next) => {
    try {
        await GroupService.updateGroup(req.body);
        req.log.info('Groups: Update group request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}

export const deleteGroupController = async (req, res, next) => {
    try {
        await GroupService.deleteGroup(req.params.id);
        req.log.info('Groups: Delete group request conditions');
        return next();
    } catch (error) {
        return next(error);
    }
}


