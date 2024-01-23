export function getMessages(req, res) {
  res.render('messages', {
    title: 'Messages to my Friends!',
    friend: 'Elon Musk',
  });
}

export function postMessage() {
  console.log('Updating messages...');
}