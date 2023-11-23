import express, { Application } from 'express';
import expressApp from './start/expressApp';
import { PORT } from './config';

const startServer = async (): Promise<void> => {
  await expressApp();
};

startServer();
