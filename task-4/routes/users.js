import Router from 'express';
import {createUsersSubrouter} from "../controllers/users/users.subrouter.js";
import UserController from '../controllers/userController.js';
import userValidateDto from '../middlewares/userValidateMiddlevare.js';
import userSchema from '../schemas/userSchema.js';

// const router = new Router();

const router = Router();
router.use('/users', createUsersSubrouter());

// router.post('/users', userValidateDto(userSchema), UserController.createUser);
// router.get('/users', UserController.getSuggestedUsers);
// router.get('/users/:id', UserController.getUser);
// router.put('/users', userValidateDto(userSchema), UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);router.post('/users', userValidateDto(userSchema), UserController.createUser);

// router.post('/groups', userValidateDto(userSchema), UserController.createUser);
// router.get('/groups', UserController.getSuggestedUsers);
// router.get('/groups/:id', UserController.getUser);
// router.put('/groups', userValidateDto(userSchema), UserController.updateUser);
// router.delete('/groups/:id', UserController.deleteUser);

export default router;
