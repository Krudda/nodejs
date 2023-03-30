import Router from 'express';
import UserController from "../controllers/userController.js";
import { userValidateDto } from '../middleware/userValidateDto.js';
import userSchema from '../schema/userSchema.js';

const router = new Router();

router.post('/users', userValidateDto(userSchema), UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUser);
router.put('/users', userValidateDto(userSchema), UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser)

export default router;