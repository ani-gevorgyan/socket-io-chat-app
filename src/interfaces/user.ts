import { Request } from 'express';

export interface UserRegistrationData {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface UserRegistrationResponse {
    id: number;
    username: string;
}

export interface UserLoginData {
    username: string;
    password: string;
}

export interface RequestWithUser extends Request {
    user: {
        id: number
    }
}