import { Router } from 'express';
import {
    createGroupController,
    getGroupController,
    getGroupsController,
    updateGroupController,
    deleteGroupController
} from "../controllers/groups/groupController.js";

export const createGroupsSubrouter = () => {
    const groupsSubrouter = Router();

    groupsSubrouter.post(
        '/',
        createGroupController
    );

    groupsSubrouter.get(
        '/',
        getGroupsController
    );

    groupsSubrouter.get(
        '/:id',
        getGroupController
    );

    groupsSubrouter.put(
        '/',
        updateGroupController
    );

    groupsSubrouter.delete(
        '/:id',
        deleteGroupController
    );

    return groupsSubrouter;
}
