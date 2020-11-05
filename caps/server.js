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
const port = process.env.PORT || 3001;
const server = require('socket.io');
//creating server and namespaces
const io = server(port);


const capsNameSpace = io.of('caps');
capsNameSpace.on('connection', socket => {
    console.log('someone connected');
    capsNameSpace.emit('hi', 'Hello all!');
})

let clients = [];
// My server is a place where connections can be made
// I can specify how many connections I want to have
// Anyone who wants to connect has to have the port #
// Socket is a client
    io.on('connection', socket => {
        clients.push(socket);
        socket.emit('data', data => {
            const message = JSON.parse(data.toString())
            console.log(message);
            if(message.event == 'pickup') {
                console.log('Pickup needed!');
                socket.broadcast.emit(data);
            }
            if(message.event == 'delivered') {
                console.log('order delivered!');
                socket.broadcast.emit(data);
            }
        })
    })



// io.broadcast = data => {
//     //sending message object from vendor
//     // This message is sent to every client
//     clients.forEach(socket => {
//         socket.write(data);
//     })
// }

server.listen(port, () => {  
  console.log(`server listening on port ${port}`);
});
