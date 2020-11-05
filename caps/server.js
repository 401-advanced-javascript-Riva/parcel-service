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
       io.emit('data', data => {
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

let rooms = [];
class Room {
    constructor(name, io) {
      this.name = name;
      this.users = [];
      this.namespace = io.of('/caps' + name);
      this.listenOnRoom();
    }

    listenOnRoom() {
      this.namespace.on('connection', (socket) => {
        
  
        socket.on('disconnect', (message) => {
         console.log(name + 'disconnected');
        });
  
        socket.on('pickup', data => {
      
        });
        socket.on('in-transit', data => {
      
        });
        socket.on('delivered', data => {
      
        });
      });
    }
  }

io.broadcast = data => {
    //sending message object from vendor
    // This message is sent to every client
    clients.forEach(socket => {
        socket.emit(data);
    })
}

server.listen(port, () => {  
  console.log(`server listening on port ${port}`);
});
module.exports = Room;