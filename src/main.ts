import express, { Application } from 'express';
import expressApp from './start/expressApp';
import { PORT } from './config';

const startServer = async (): Promise<void> => {
  const app: Application = express();
  await expressApp(app);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
