import express from 'express';
import { router as apiRouter } from './routes/apiRoutes.js';

const app = express();

app.use('/api', apiRouter);

export default app;
