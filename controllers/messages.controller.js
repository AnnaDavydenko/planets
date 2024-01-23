export function getMessages(req, res) {
  res.send('<ul><li>Hello Albert!</li></ul>');
}

export function postMessage(req, res) {
  console.log('Updating messages...');
}