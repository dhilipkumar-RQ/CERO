import mongoose from 'mongoose';
import { DATABASE_URL, ENVIRONMENT } from '../config/index';
import { MongoMemoryServer } from 'mongodb-memory-server';

let client: mongoose.Mongoose;
let mongod = null;

const connectDB = async (): Promise<mongoose.Mongoose> => {
  try {
    if (ENVIRONMENT === 'test') {
      if (mongod) {
        await mongoose.disconnect();
        await mongod.stop();
      }
      mongod = await MongoMemoryServer.create();
      const dbUrl: any = mongod.getUri();
      client = await mongoose.connect(dbUrl);
    } else {
      client = await mongoose.connect(DATABASE_URL);
    }
    console.log(`MongoDB connected - ${client.connection.host}`);
    return client;
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
