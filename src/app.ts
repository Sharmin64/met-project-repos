import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/routes';
const app: Application = express();

// *persers
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

const testing = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};
app.get('/', testing);

app.use(globalErrorHandler);

app.use(notFoundRoute);

export default app;
