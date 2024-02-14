import express from 'express';
import { planetsRouter } from './routes/planets/planets.router.js';
import cors from 'cors';
import morgan from 'morgan';

export const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(morgan('combined'))

app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetsRouter);