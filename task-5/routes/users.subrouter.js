import { Router } from 'express';
import {
    addUserToGroupController,
    createUserController, deleteUserController,
    getSuggestedUsersController,
    getUserController, updateUserController
} from "../controllers/users/userController.js";
import userValidationMiddleware from "../middlewares/userValidationMiddleware.js";

export const createUsersSubrouter = () => {
    const usersSubrouter = Router();

    usersSubrouter.post(
        '/',
        userValidationMiddleware(),
        createUserController()
    );

    usersSubrouter.get(
        '/',
        getSuggestedUsersController()
    );

    usersSubrouter.get(
        '/:id',
        getUserController()
    );

    usersSubrouter.put(
        '/',
        userValidationMiddleware(),
        updateUserController()
    );

    usersSubrouter.delete(
        '/:id',
        deleteUserController()
    );

    usersSubrouter.post(
        '/group',
        addUserToGroupController()
    );

    return usersSubrouter;
}
