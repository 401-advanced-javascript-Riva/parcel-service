'use strict';

require('dotenv').config();
const port = process.env.PORT || 3001;

//creating server and namespaces
const server = require('net').createServer();
const io = require('socket.io')(server);

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
// const capsNameSpace = server.of('caps');
// capsNameSpace.on('connection', socket => {
//     console.log('someone connected');
//     capsNameSpace.emit('hi', 'Hello all!');
// })
let rooms = [];
io.on('connection', socket => {
    io.on('adduser', (username, room) =>{
        socket.username = username;
        socket.room = room;
        usernames[username] = username;
        socket.join(room);
        socket.emit('', 'SERVER', 'You are connected.');
        socket.broadcast.to(room).emit('', 'SERVER', username + ' has connected to this room');
    });
        io.on('disconnect', () => {
        // remove the username from list
        delete usernames[socket.username];
        // update list of clients
        socket.emit('updateusers', usernames);
        // tell everyone that driver or vender has left
        if(socket.username !== undefined){
            socket.broadcast.emit('', 'SERVER', socket.username + ' has disconnected');
            socket.leave(socket.room);
        }
    });
});
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
