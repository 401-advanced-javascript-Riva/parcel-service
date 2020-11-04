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
const net = require('net');
const port = process.env.PORT || 3001;
 
// Create Server instance 
// Socket is my connection
const server = net.createServer(socket => {
    socket.on('data', data => {
        console.log(data.toString());
});

socket.write('Server says Hello!');
socket.end('server is closing connection now');
}).on('error', err => {
    console.error(err)
});

server.listen(port, () => {  
  console.log(`server listening on port ${port}`);
});
