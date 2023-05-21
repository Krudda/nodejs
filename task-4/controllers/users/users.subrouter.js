import { Router } from 'express';
import userValidateDto from "../../middlewares/userValidateMiddlevare.js";
import UserController, {
    createUserController,
    getSuggestedUsersController,
    getUserController, updateUserController
} from "../userController.js";
import userValidateMiddlevare from "../../middlewares/userValidateMiddlevare.js";

export const createUsersSubrouter = () => {
    const usersSubrouter = Router();

    usersSubrouter.post(
        '/',
        userValidateMiddlevare(),
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
        userValidateMiddlevare(),
        updateUserController()
    );

    usersSubrouter.delete(
        '/:id',
        UserController.deleteUser
    );

    return usersSubrouter;
}
