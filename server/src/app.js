import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { planetsRouter } from './routes/planets/planets.router.js';
import cors from 'cors';
import morgan from 'morgan';
import { launchesRouter } from './routes/launches/launches.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);