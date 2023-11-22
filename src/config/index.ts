import * as dotenv from 'dotenv'; 

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? 'development'}` 
});

const PORT  = Number(process.env.PORT)
const DATABASE_URL = process.env.DATABASE_URL
const ENVIRONMENT = process.env.ENVIRONMENT

export {PORT, DATABASE_URL, ENVIRONMENT}