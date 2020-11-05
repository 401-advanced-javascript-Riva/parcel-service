'use strict';

require('dotenv').config();
const port = process.env.PORT || 3001;

//creating server and namespaces
const io = require('socket.io');
const server = io(port);

const caps = server.of('/caps');
let clients = [];
// My server is a place where connections can be made
// I can specify how many connections I want to have
// Anyone who wants to connect has to have the port #
// Socket is a clients
    server.on('connection', socket => {
        console.log('server is on!')
        clients.push(socket);
       server.on('data', data => {
            const message = JSON.parse(data.toString())
            console.log(message);
            if(message.event == 'pickup') {
                console.log('Pickup needed!');
                caps.broadcast.emit(data);
            }
            if(message.event == 'delivered') {
                console.log('order delivered!');
                caps.emit(data);
            }
        })
    })
   

caps.broadcast = data => {
    //sending message object from vendor
    // This message is sent to every client
    clients.forEach(socket => {
        socket.emit(data);
    })
}

