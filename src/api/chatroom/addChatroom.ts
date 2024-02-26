import { Router, Request, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import chatroomService from '../../services/chatroom.service';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';

const router: Router = Router();

router.post('/',
    asyncMiddlewareWrapper(requireToBeAuthenticated),
    asyncMiddlewareWrapper(async (req: Request, res: Response) => {
        const data = {
            name: req.body.name,
        }
        const chatroom = await chatroomService.createChatroom(data);
        res.status(200).json({ data: { chatroom } });
    }));

export default router;