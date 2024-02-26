import { Router, Request, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import authService from '../../services/auth.service';

const router: Router = Router();

router.post('/login', asyncMiddlewareWrapper(async (req: Request, res: Response) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const authToken = await authService.login(data);
    res.status(200).json({ data: { token: authToken } });
}));

export default router;