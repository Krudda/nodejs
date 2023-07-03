import { Router } from 'express';
import {
    addUserToGroupController,
    createUserController,
    deleteUserController,
    getSuggestedUsersController,
    getUserController,
    loginController,
    logoutController,
    tokenRefreshController,
    updateUserController
} from "../controllers/users/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

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
        authMiddleware,
        getSuggestedUsersController
    );

    usersSubrouter.get(
        '/:id',
        authMiddleware,
        getUserController
    );

    usersSubrouter.put(
        '/',
        authMiddleware,
        updateUserController
    );

    usersSubrouter.delete(
        '/:id',
        authMiddleware,
        deleteUserController
    );

    usersSubrouter.post(
        '/group',
        authMiddleware,
        addUserToGroupController
    );

    return usersSubrouter;
}
