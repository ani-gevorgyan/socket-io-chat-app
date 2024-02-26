import { MessageData } from '../interfaces';
import Message from '../entities/Message';
import userService from './user.service';
import chatroomService from './chatroom.service';

class MessageService {

    async createMessage(messageData: MessageData): Promise<Message> {
        const message = this.generateMessage(messageData);
        return message.save();
    }

    generateMessage(messageData: any): Message {
        const message = new Message();
        message.message = messageData.message;
        message.chatroom = messageData.chatroomId;
        message.user = messageData.userId;
        return message;
    }

    async findAllMessagesByUserId(userId: number): Promise<Message[]> {
        const { messages } = await userService.findUserByIdWithMessages(userId);
        return messages;
    }

    async findAllMessagesOfChatroomByChatroomId(chatroomId: number): Promise<Message[]> {
        const { messages } = await chatroomService.findChatroomWithMessagesByChatroomId(chatroomId);
        return messages;
    }
}

const messageService = new MessageService();
export default messageService;