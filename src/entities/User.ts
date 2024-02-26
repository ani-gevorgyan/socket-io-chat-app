import {
    Entity, BaseEntity, PrimaryColumn, Column, Unique, OneToMany
} from 'typeorm';
import Message from './Message';

@Entity('users')
@Unique(['username'])
export default class User extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Message, (message) => message.user, {
        cascade: ['insert', 'update']
    })
    messages: Message[];
}