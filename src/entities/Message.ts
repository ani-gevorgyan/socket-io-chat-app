import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import User from './User';
import Chatroom from './Chatroom';

@Entity('messages')
export default class Message extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    message: string;

    @ManyToOne(() => User, (user) => user.messages, {
        cascade: ['update', 'remove']
    })
    user: number;

    @ManyToOne(() => Chatroom, (chatroom) => chatroom.messages, {
        cascade: ['update', 'remove']
    })
    chatroom: number;
}