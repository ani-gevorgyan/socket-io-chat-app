import { Router, Request, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import chatroomService from '../../services/chatroom.service';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';

const router: Router = Router();

router.get('/',
    asyncMiddlewareWrapper(requireToBeAuthenticated),
    asyncMiddlewareWrapper(async (req: Request, res: Response) => {
        const chatrooms = await chatroomService.findAllChatrooms();
        res.status(200).json({ data: { chatrooms } });
    }));

export default router;