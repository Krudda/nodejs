import { Router } from 'express';
import {
    createGroupController,
    getGroupController,
    getGroupsController,
    updateGroupController,
    deleteGroupController
} from "../controllers/groups/groupController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

export const createGroupsSubrouter = () => {
    const groupsSubrouter = Router();

    groupsSubrouter.post(
        '/',
        authMiddleware,
        createGroupController
    );

    groupsSubrouter.get(
        '/',
        authMiddleware,
        getGroupsController
    );

    groupsSubrouter.get(
        '/:id',
        authMiddleware,
        getGroupController
    );

    groupsSubrouter.put(
        '/',
        authMiddleware,
        updateGroupController
    );

    groupsSubrouter.delete(
        '/:id',
        authMiddleware,
        deleteGroupController
    );

    return groupsSubrouter;
}
