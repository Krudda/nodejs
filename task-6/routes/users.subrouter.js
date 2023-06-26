import { Router } from 'express';
import {
    addUserToGroupController,
    createUserController, deleteUserController,
    getSuggestedUsersController,
    getUserController, updateUserController
} from "../controllers/users/userController.js";

export const createUsersSubrouter = () => {
    const usersSubrouter = Router();

    usersSubrouter.post(
        '/',
        createUserController
    );

    usersSubrouter.get(
        '/',
        getSuggestedUsersController
    );

    usersSubrouter.get(
        '/:id',
        getUserController
    );

    usersSubrouter.put(
        '/',
        updateUserController
    );

    usersSubrouter.delete(
        '/:id',
        deleteUserController
    );

    usersSubrouter.post(
        '/group',
        addUserToGroupController
    );

    return usersSubrouter;
}
