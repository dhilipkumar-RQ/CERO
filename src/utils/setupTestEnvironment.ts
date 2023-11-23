// setupTestEnvironment.ts
import { connectDB, disconnectDB } from '../database/connectdb';
import expressApp from '../start/expressApp';

let app;
beforeAll(async () => {
  app = await expressApp();
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
  await app.close();
});

export { app };
