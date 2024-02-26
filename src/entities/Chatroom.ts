import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import Message from './Message';

@Entity('chatrooms')
@Unique(['name'])
export default class Chatroom extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Message, (message) => message.chatroom, {
        cascade: ['insert', 'update']
    })
    messages: Message[];
}