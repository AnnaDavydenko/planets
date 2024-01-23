import { getMessages, postMessage } from '../controllers/messages.controller.js';
import express from 'express';

export const messagesRouter = express.Router();

messagesRouter.get('/', getMessages);
messagesRouter.post('/', postMessage);