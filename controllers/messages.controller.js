import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getMessages(req, res) {
  const filePath = path.join(__dirname, '..', 'public', 'images', 'ski-chamonix.jpg');
  res.sendFile(filePath);
  // res.send('<ul><li>Hello Albert!</li></ul>');
}

export function postMessage() {
  console.log('Updating messages...');
}