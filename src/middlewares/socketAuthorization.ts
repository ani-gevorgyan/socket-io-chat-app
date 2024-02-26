import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';
import { SocketWithUser } from '../interfaces';
import { AUTH_TOKEN_PREFIX } from '../contants';

const socketAuthorization = async (socket: SocketWithUser, next: any) => {
    const authorization = socket.handshake.auth.token;
    let token;
    if (authorization && authorization.startsWith(AUTH_TOKEN_PREFIX)) {
        token = authorization.split(' ')[1];
    }
    const jwtKey = process.env.JWT_KEY!;
    if (!token) {
        throw new UnauthorizedError();
    }

    try {
        const decoded = jwt.verify(token, jwtKey);

        const decodedData = JSON.stringify(decoded);
        socket.user = {
            id: JSON.parse(decodedData).id,
        };
        next();
    } catch (error) {
        console.log('Socket authorization error: ', error);
        throw new UnauthorizedError();
    }
};

export default socketAuthorization;