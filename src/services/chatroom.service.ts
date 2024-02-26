import { ChatroomData } from '../interfaces/chatroom';
import Chatroom from '../entities/Chatroom';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';

class ChatroomService {

    async createChatroom(data: ChatroomData): Promise<Chatroom> {
        const chatroom = await Chatroom.findOne({ where: { name: data.name } });
        if (chatroom) {
            throw new BadRequestError('Chatroom with specified name already exists!');
        }
        const newChatroom = this.generateChatroom(data);
        return newChatroom.save();
    }

    generateChatroom(chatroomData: ChatroomData): Chatroom {
        const chatroom = new Chatroom();
        chatroom.name = chatroomData.name;
        return chatroom;
    }

    async findAllChatrooms(): Promise<Chatroom[]> {
        return Chatroom.find();
    }

    async findChatroomById(id: number): Promise<Chatroom> {
        const chatroom = await Chatroom.findOneBy({ id });
        if (!chatroom) {
            throw new NotFoundError('Chatroom does not exist!');
        }
        return chatroom;
    }

    async findChatroomWithMessagesByChatroomId(chatroomId: number): Promise<Chatroom> {
        const chatroom = await Chatroom.findOne({
            where: {
                id: chatroomId
            }, relations: ['messages']
        });

        if (!chatroom) {
            throw new NotFoundError('Chatroom does not exist!');
        }
        return chatroom;
    }


}

const chatroomService = new ChatroomService();
export default chatroomService;