import express, { Application, NextFunction, Request, Response } from 'express';
import { IndexRoutes } from './app/routes/index.routes';
import { globalerrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to HealthCare API');
});
app.use('/api', IndexRoutes);
app.use(globalerrorHandler);
app.use(notFound);
export default app;