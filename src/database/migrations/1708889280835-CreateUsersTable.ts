import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1708889280835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255'
                    }
                ],
                indices: [{ columnNames: ['username'], isUnique: true }],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}



