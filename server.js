import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import * as https from 'https';
import { readFileSync } from 'node:fs';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(helmet());

const checkLoggedIn = (req, res, next) => {
  const isLoggedIn = true; //todo
  if(!isLoggedIn) {
    return res.status(401).json({
      error: 'Not logged in',
    });
  }
  next();
}

app.get('/auth/google/', (req, res) => {})
app.get('/auth/google/callback', (req, res) => {})
app.get('/auth/logout', (req, res) => {})

app.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your secret value is 42!');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public' + '/index.html');
});

https.createServer({
  key: readFileSync('key.pem'),
  cert: readFileSync('cert.pem'),
}, app).listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
