'use strict';

require('dotenv').config();
const port = process.env.PORT || 3001;

//creating server and namespaces
const app = require('express')();
const server = app.listen(port);
const io = require('socket.io')(server);
app.set('socketio', io);
app.post('//delivery/:driver/:code', (req, res) => {
    
    });
    
// My server is a place where connections can be made
// I can specify how many connections I want to have
// Anyone who wants to connect has to have the port #
// Socket is a clients
server.on('connection', socket => {
    console.log(`Welcome ${socket.id}`)
})
caps.on('connection' , socket => {
    console.log('socket connected to caps server');
})
vendor.on('connection', socket => {
    socket.on('pickup', payload => {
        console.log(payload);
        caps.emit('pickup', payload);
    })
})
driver.on('connection', socket => {
    socket.on('in-transit', payload => {
        console.log(payload);
            caps.emit('delivered', payload);
    })
})
//working on setting up rooms for driver and vendor
const clientRooms = ['driver', 'vendor'];
const caps = server.of('/caps');
const vendor = server.of('/vendor');
const driver = server.of('/driver').on('connection' ,socket => {
    caps.emit('welcome driver!');
    socket.on('joinRoom', room => {
        if(rooms.includes(clientRooms)) {
            socket.join(room);
            io.of('/driver');
            io.in(room).emit('driver here')
            return socket.emit('driver connected to room');
        } else {
            return socket.emit('err', "error no room named");
        }
    })
})



const queue = {
    pickup: {},
    delivered: {},
    inTransit: {}
}

server.on('connection', socket => {
    socket.on('pickup', payload => {
        //add payload to inTransit object
        let id = Math.floor(Math.random() + 10000000);

        queue.inTransit(id) = payload;
        socket.broadcast.emit('pick-up', {id, payload})
    })
    socket.on('in-transit', order => {
        let {id, payload} = order;
        delete queue.pickup[id];
        queue.inTransit[id] = payload;
        console.log('this is the queue', queue)
        socket.broadcast.emit('in-transit', payload)
    })
    socket.on('delivered', payload => {

    })
})


socket.on('getPickups', () => {
    Object.keys(queue.pickup). forEach(id => {
        //fetch all puickups order in queue
        //order is organized by id and I need 
        socket.emit('pickup', {id, payload: queue.pickup[id]})
    })
})


