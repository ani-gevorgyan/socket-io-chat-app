import dotenv from 'dotenv';
import { Application } from 'express';
import initializeApp from './app';
import connectionSource from './ormconfig';

async function startServer(): Promise<Application> {
    try {
        dotenv.config();

        // load entities, establish db connection, sync schema, etc.
        await connectionSource.initialize()

        const app = await initializeApp();

        const port = process.env.PORT || 4000;

        app.listen(port, () => {
            console.log(`Magic is happening on port ${port}`);
        });

        return app;
    } catch (error) {
        console.log(`Error ---> ${error}`);
        process.exit(1);
    }
}

startServer();