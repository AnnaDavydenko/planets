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

app.get('/secret', (req, res) => {
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
