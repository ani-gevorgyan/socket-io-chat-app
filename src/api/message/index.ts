import { Router } from 'express';
import getMessagesOfAUser from './getMessagesOfAUser';
import getMessagesInChatroom from './getMessagesInChatroom';

const router: Router = Router();

const BASE_PATH = '/messages';

router.use(BASE_PATH, getMessagesOfAUser);
router.use(BASE_PATH, getMessagesInChatroom);
export default router;