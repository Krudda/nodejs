import { Router } from 'express';
import {
    createGroupController,
    getGroupController,
    getGroupsController,
    updateGroupController,
    deleteGroupController
} from "../controllers/groups/groupController.js";
// import userValidateMiddlevare from "../../middlewares/userValidationMiddlevare.js";

export const createGroupsSubrouter = () => {
    const groupsSubrouter = Router();

    groupsSubrouter.post(
        '/',
        // userValidateMiddlevare(),
        createGroupController()
    );

    groupsSubrouter.get(
        '/',
        getGroupsController()
    );

    groupsSubrouter.get(
        '/:id',
        getGroupController()
    );

    groupsSubrouter.put(
        '/',
        // userValidateMiddlevare(),
        updateGroupController()
    );

    groupsSubrouter.delete(
        '/:id',
        deleteGroupController()
    );

    return groupsSubrouter;
}
