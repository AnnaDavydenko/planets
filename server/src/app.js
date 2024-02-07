import express from 'express';
import { planetsRouter } from './routes/planets/planets.router.js';

export const app = express();
app.use(express.json());
app.use(planetsRouter);