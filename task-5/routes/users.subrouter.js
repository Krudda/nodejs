import { Router } from 'express';
import {
    addUserToGroupController,
    createUserController, deleteUserController,
    getSuggestedUsersController,
    getUserController, updateUserController
} from "../controllers/users/userController.js";
import userValidationMiddlevare from "../middlewares/userValidationMiddlevare.js";

export const createUsersSubrouter = () => {
    const usersSubrouter = Router();

    usersSubrouter.post(
        '/',
        userValidationMiddlevare(),
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
        userValidationMiddlevare(),
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
