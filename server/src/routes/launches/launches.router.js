import express from 'express';
import { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch } from './launches.controller.js';

export const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);