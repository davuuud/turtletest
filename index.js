const express = require('express');
const websockets = require('./websockets');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/app.js', (req, res) => {
  res.sendFile(__dirname + '/app.js');
});

const server = app.listen(port, () => {
  console.log("Server listening on port:", port);
});

const { twss, hwss } = websockets.WebsocketServer(server);
