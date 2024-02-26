import { DataSource } from 'typeorm';

const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'chat_app',
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['src/entities/**.ts'],
    migrations: ['src/database/migrations/*.ts'],
});

export default connectionSource;
