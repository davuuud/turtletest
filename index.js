const express = require("express");
const app = express();
var expressWs = require('express-ws')(app);
const port = 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/app.js', (req, res) => {
  res.sendFile(__dirname + '/public/app.js');
});

app.ws("/", (ws, req) => {
  console.log("Irgendein Hirt ist jetzt a dabei");

  ws.on("message", msg => {
    const parsedMessage = JSON.parse(msg);
    console.log(parsedMessage);
  });
  
});

app.ws("/turtle", (ws, req) => {
  console.log("Irgendeine Turtle ist jetzt a dabei");

  ws.on("message", (msg) => {
    ws.send("Message received");
    const parsedMessage = JSON.parse(msg);
    console.log(parsedMessage);
  });
  
});

app.listen(port, () => {
  console.log("Server listening on port:", port);
});
