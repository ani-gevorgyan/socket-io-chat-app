import express, { Application, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { BASE_URL } from './contants';
import errorHandler from './errors/errorHandler';
import authRouter from './api/auth';
import chatroomRouter from './api/chatroom';
import messageRouter from './api/message';
import socketAuthorization from './middlewares/socketAuthorization';
import { SocketWithUser } from './interfaces';
import chatroomService from './services/chatroom.service';
import NotFoundError from './errors/NotFoundError';
import userService from './services/user.service';
import messageService from './services/message.service';

async function initializeApp(): Promise<any> {
    const app: Application = express();
    const server = http.createServer(app);
    const io = new Server(server);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(BASE_URL, authRouter);
    app.use(BASE_URL, chatroomRouter);
    app.use(BASE_URL, messageRouter);

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('Welcome to Chat App!');
    });

    app.all('*', (req: Request, res: Response) => {
        res.status(404).json({ error: 'Route not found' });
    });

    app.use(errorHandler);
    io.use(socketAuthorization);

    io.of('/').on('connect', (socket: SocketWithUser) => {
        console.log('A user has connected!', socket.user?.id);

        socket.on('disconnect', (data) => {
            console.log('A client disconnected, reason: %s', data);
        });

        socket.on('joinRoom', async ({ chatroomId }) => {
            const chatRoom = await chatroomService.findChatroomById(chatroomId);
            const user = await userService.findUserById(socket.user?.id!);
            if (!chatRoom) {
                throw new NotFoundError('Chatroom does not exist!');
            }
            socket.join(chatroomId);
            io.to(chatroomId).emit('join', { user, chatRoom });
        });

        socket.on('chatroomMessage', async ({ chatroomId, message }) => {
            const user = await userService.findUserById(socket.user?.id!);
            io.to(chatroomId).emit('newMessage', {
                message,
                name: user.username,
                userId: socket.user?.id,
            });
            await messageService.createMessage({ message, userId: user.id, chatroomId });
        });

        socket.on('leaveRoom', async ({ chatroomId }) => {
            socket.leave(chatroomId);
            console.log('A user left chatroom: ' + chatroomId);
            const user = await userService.findUserById(socket.user?.id!);
            io.to(chatroomId).emit('left', {
                name: user.username,
                chatroomId
            });
        });

    });

    return server;
}

export default initializeApp;