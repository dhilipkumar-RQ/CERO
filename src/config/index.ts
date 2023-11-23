import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? 'development'}`,
});

const PORT = Number(process.env.PORT);

const dbConfig = {
  development: {
    dbUrl: 'mongodb://localhost:27017/cero-dev',
  },
  staging: {
    dbUrl: process.env.DATABASE_URL,
  },
  production: {
    dbUrl: process.env.DATABASE_URL,
  },
};

const DATABASE_URL = dbConfig[process.env.NODE_ENV].dbUrl;

const ENVIRONMENT = process.env.ENVIRONMENT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const DEFAULT_COMPANY_USER_PASSWORD = process.env.DEFAULT_COMPANY_USER_PASSWORD

export { PORT, DATABASE_URL, ENVIRONMENT, JWT_SECRET_KEY, DEFAULT_COMPANY_USER_PASSWORD };
