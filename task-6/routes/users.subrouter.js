import { Router } from 'express';
import {
    addUserToGroupController,
    createUserController, deleteUserController,
    getSuggestedUsersController,
    getUserController, loginController, logoutController, tokenRefreshController, updateUserController
} from "../controllers/users/userController.js";

export const createUsersSubrouter = () => {
    const usersSubrouter = Router();

    usersSubrouter.post(
        '/',
        createUserController
    );

    usersSubrouter.post(
        '/login',
        loginController
    );

    usersSubrouter.post(
        '/logout',
        logoutController
    );
    usersSubrouter.post(
        '/refresh',
        tokenRefreshController
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
