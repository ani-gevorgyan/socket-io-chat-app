import { Router } from 'express';
import addChatroom from './addChatroom';
import getChatrooms from './getChatrooms';

const router: Router = Router();

const BASE_PATH = '/chatroom';

router.use(BASE_PATH, addChatroom);
router.use(BASE_PATH, getChatrooms);

export default router;