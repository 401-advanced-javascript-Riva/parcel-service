'use strict';

const port = process.env.PORT || 3001;
require('dotenv').config();
const ioClient = require('socket.io-client');
const socket = ioClient('ws://localhost:' + port + '/driver');


class Driver {
    constructor() {
        this.currentOrder = undefined;
        this.socket = socket;
    }
    pickup(order) {
        this.socket.on('pickup', payload => {
            console.log(`driver picked up order ${payload.payload.id}`);
            payload.event = 'in-transit';
            setTimeout(() => {
                socket.emit('in-transit', payload);
            }, 1000)
        })
        setTimeout(() => {
            this.deliver();
        }, 3000)
    }
    deliver() {
        this.socket.on('in-transit', payload => {
            console.log(`driver delivered order ${payload.payload.id}`);
            payload.event = 'delivered';
            setTimeout(() => {
                this.socket.emit('delivered', payload);
            },2000)
        })
    }

}

    this.socket.emit('getPickups');
    //for every items in pickups, I have a different emission
    this.socket.on('pickup', order => {
        console.log('incoming order', order);
        this.socket.emit('in-transit', order);
    });
const driver = new Driver();
driver.pickup();
driver.deliver();
driver.emit('joinRoom', 'driver')
driver.on('new driver', res => console.log(res));