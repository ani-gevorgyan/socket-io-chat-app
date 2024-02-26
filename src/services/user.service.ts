import { UserRegistrationData, UserRegistrationResponse } from './../interfaces';
import User from '../entities/User';
import UnauthorizedError from '../errors/UnauthorizedError';
import NotFoundError from '../errors/NotFoundError';

class UserService {
    async createUser(data: UserRegistrationData): Promise<UserRegistrationResponse> {
        const user = this.generateUser(data);
        return user.save();
    }

    async authenticateUserByUsername(username: string): Promise<User> {
        const user = await User.findOne({
            where: {
                username
            }
        });
        if (!user) {
            throw new UnauthorizedError('Invalid credentials!');
        }
        return user;
    }

    generateUser(userData: UserRegistrationData): User {
        const user = new User();
        user.username = userData.username;
        user.password = userData.password;
        return user;
    }

    async findUserById(userId: number): Promise<User> {
        const user = await User.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundError('User not found!');
        }
        return user;
    }

    async findUserByIdWithMessages(userId: number): Promise<User> {
        const user = await User.findOne({
            where: {
                id: userId
            }, relations: ['messages']
        });
        if (!user) {
            throw new NotFoundError('User not found!');
        }
        return user;
    }
}

const userService = new UserService();
export default userService;