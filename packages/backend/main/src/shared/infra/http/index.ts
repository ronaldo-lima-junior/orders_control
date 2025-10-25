import express, { Express } from 'express';
import routes from './routes';
import ErrorHandler from './middlewares/ErrorHandler';

const errorHandler = new ErrorHandler();

const app: Express = express();
app.use(express.json({ limit: '50mb' }));
app.use(routes);
app.use(errorHandler.execute);

export default app;
