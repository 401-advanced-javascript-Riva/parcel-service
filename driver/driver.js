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
        const message = {
            "event": 'delivered',
            "payload": this.currentOrder
        }
        this.socket.write(JSON.stringify(message));
    }
}

const driver = new Driver();
driver.pickup();