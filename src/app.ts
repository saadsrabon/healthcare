import express, { Application, Request, Response } from 'express';
import { IndexRoutes } from './app/routes/index.routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});
app.use('/api', IndexRoutes);

export default app;