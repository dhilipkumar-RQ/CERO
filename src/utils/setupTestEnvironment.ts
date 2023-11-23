// setupTestEnvironment.ts
import { connectDB, disconnectDB } from '../database/connectdb';
import express, { Application, Request, Response } from 'express';
import routes from '../routes';
import errorHandler from '../middlewares/errorHandler.middleware';
import morgan from 'morgan';
import checkIsDev from '../utils/checkIsDev';
import notFoundHandler from '../middlewares/notFound.middleware';

let server;
beforeAll(async () => {
    const PORT = 0
    const app: Application = express();
    server = app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', async (req: Request, res: Response) => {
        res.status(200).json({
        message: 'CERO-ORCHESTRATOR',
        });
    });

    routes(app);

    app.use(notFoundHandler);
    app.use(errorHandler);
//  app = await expressApp();
    await connectDB();
});

afterAll(async () => {
  await disconnectDB();
  await server.close();
});



export { server };
