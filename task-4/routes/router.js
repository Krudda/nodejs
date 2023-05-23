import Router from 'express';
import {createUsersSubrouter} from "./users.subrouter.js";
import {createGroupsSubrouter} from "./groups.subrouter.js";

const router = Router();

router.use('/users', createUsersSubrouter());
router.use('/groups', createGroupsSubrouter());

export default router;
