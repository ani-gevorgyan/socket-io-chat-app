import { Router, Request, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import chatroomService from '../../services/chatroom.service';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';
import messageService from '../../services/message.service';
import { RequestWithUser } from 'src/interfaces';

const router: Router = Router();

router.get('/:chatroomId',
    asyncMiddlewareWrapper(requireToBeAuthenticated),
    asyncMiddlewareWrapper(async (req: Request, res: Response) => {
        const messages = await messageService.findAllMessagesOfChatroomByChatroomId(+req.params.chatroomId);
        res.status(200).json({ data: { messages } });
    }));

export default router;