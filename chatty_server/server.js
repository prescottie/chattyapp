// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// use to count all users connected to the websockets server  and broadcast out to all connected users 
function broadcastUserCount() {
  const userCount = wss.clients.size 
  wss.broadcast({ 
    type: "userCount",
    count: userCount
  });
}
// receive a message from a client, give it a unique id and broadcast it to all users 
function handleMsg(data) { 
  let msgData;
  try {
    msgData = JSON.parse(data);
  }
  catch(error) {
    console.log(error);
    return;
  }
  msgData.id = uuidv4();
  wss.broadcast(msgData);
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  broadcastUserCount();
  console.log(`${wss.clients.size} Clients are connected`);
  client.on('message', (data) => {
    handleMsg(data);
  });
  
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    broadcastUserCount();
    console.log('Client disconnected')
  });
  
});