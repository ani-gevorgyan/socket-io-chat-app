import { Router, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';
import messageService from '../../services/message.service';
import { RequestWithUser } from '../../interfaces';

const router: Router = Router();

router.get('/',
    asyncMiddlewareWrapper(requireToBeAuthenticated),
    asyncMiddlewareWrapper(async (req: RequestWithUser, res: Response) => {
        const messages = await messageService.findAllMessagesByUserId(req.user.id);
        res.status(200).json({ data: { messages } });
    }));

export default router;