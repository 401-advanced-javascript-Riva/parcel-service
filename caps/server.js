'use strict';
/*
- Creates a pool of connected clients
- Accept inbound TCP connections on a declared port
- On new connections, add the client to the connection pool
- On incoming data from a client:
    - Read and parse the incoming data/payload
    - Verify that the data is legitimate
    - Is it a JSON object with both an event and payload properties?
    - If the payload is ok, broadcast the raw data back out to each of the other connected clients
*/
require('dotenv').config();
const faker = require('faker');
const storeName = process.env.STORE_NAME;
const net = require('net');
const port = process.env.PORT || 3001;
 
// Create Server instance 
// Socket is my connection
// The moment the client connects, I will send hello as test.
// On data, if client sends more data, the function will print it
const server = net.createServer(socket => {
    socket.write('Hello')
    socket.on('data', data => {
        console.log(data.toString());
    })
})

server.listen(port, () => {  
  console.log(`server listening on port ${port}`);
});
 
server.on('connection', socket => {
    console.log('new connection is made');
    socket.write('Hello, client');
})
