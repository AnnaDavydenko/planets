import express from 'express';
import { planetsRouter } from './routes/planets/planets.router.js';
import cors from 'cors';
import morgan from 'morgan';
import { launchesRouter } from './routes/launches/launches.router.js';

export const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(morgan('combined'))

app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));
// app.get('/*', (res, req) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html')
// })

app.use(planetsRouter);
app.use(launchesRouter);