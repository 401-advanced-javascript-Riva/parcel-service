'use strict';

require('dotenv').config();
const port = process.env.PORT || 3001;

//creating server and namespaces
const io = require('socket.io');
const server = io(port);

const vendor = server.of('/vendor');
const driver = server.of('/driver');
const caps = server.of('/caps');

// My server is a place where connections can be made
// I can specify how many connections I want to have
// Anyone who wants to connect has to have the port #
// Socket is a clients
server.on('connection', socket => {
    console.log(`Welcome ${socket.id}`)
})
vendor.on('connection', socket => {
    socket.on('pickup', payload => {
        console.log(payload);
        driver.emit('pickup', payload);
    })
})
driver.on('connection', socket => {
    socket.on('in-transit', payload => {
        console.log(payload);
            vendor.emit('delivered', payload);
    })
})



