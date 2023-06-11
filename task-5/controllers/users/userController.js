import UserService from '../../services/userService.js';

export const createUserController = async (req, res, next) => {
    try {
        const user = await UserService.createUser(req.body);
        res.json(user);
        req.log.info('Users: Create user request conditions');
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
