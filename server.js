import express from 'express';
import { getMessages, postMessage } from './controllers/messages.controller.js';
import { getFriend, getFriends, postFriend } from './controllers/friends.controller.js';

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use(express.json());

app.get('/friends', getFriends);
app.get('/friends/:friendId', getFriend);
app.post('/friends', postFriend);

app.get('/messages', getMessages);
app.post('/messages', postMessage);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});