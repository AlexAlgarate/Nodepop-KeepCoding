import express from 'express';
import { renderFile } from 'ejs';
import morgan from 'morgan';

import { router as apiRouter } from './routes/apiRoutes.js';
import { connectMongoose } from './lib/connectMongoose.js';
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

app.use('/api', apiRouter);

export default app;
