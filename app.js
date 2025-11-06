import express from 'express';
import { renderFile } from 'ejs';
import morgan from 'morgan';
import { connectMongoose } from './lib/connectMongoose.js';

import { router as apiRouter } from './routes/apiRoutes.js';
import { router as webRouter } from './routes/webRoutes.js';

import {
  notFoundErrorHandler,
  serverErrorHandler,
} from './lib/middleware/errorMiddleware.js';
import { sessionInViews, sessionMiddleware } from './lib/middleware/authMiddleware.js';

const APP_NAME = 'Práctica KC Node';

const app = express();

// Mongoose connection
const connection = await connectMongoose();
console.log(`Connected to MongoDb: ${connection.name}`);

// Middleware's
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(morgan('dev'));

// EJS
app.set('view engine', 'ejs');
app.engine('html', renderFile);
app.set('views', './views');

app.use((req, res, next) => {
  res.locals.env = process.env.NODE_ENV;
  res.locals.appName = APP_NAME;
  next();
});

// Auth Middleware
app.use(sessionMiddleware);
app.use(sessionInViews);

// routers
app.use('/api', apiRouter);
app.use('/', webRouter);

// Error handlers
app.use(serverErrorHandler);
app.use(notFoundErrorHandler);

export default app;
