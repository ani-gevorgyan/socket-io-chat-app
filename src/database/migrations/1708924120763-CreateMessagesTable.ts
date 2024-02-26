import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMessagesTable1708924120763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'messages',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'message',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'userId',
                        type: 'int'
                    },
                    {
                        name: 'chatroomId',
                        type: 'int'
                    }
                ],
            })
        )

        await queryRunner.createForeignKey(
            'messages',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
            }),
        );

        await queryRunner.createForeignKey(
            'messages',
            new TableForeignKey({
                columnNames: ['chatroomId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'chatrooms',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages');
    }

}
