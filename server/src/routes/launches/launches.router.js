import express from 'express';
import { httpGetAllLaunches, httpAddNewLaunch } from './launches.controller.js';

export const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);