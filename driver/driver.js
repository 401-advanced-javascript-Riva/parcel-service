'use strict';

const port = process.env.PORT;
require('dotenv').config();
const ioClient = require('socket.io-client');
const port = process.env.PORT;
const socket = ioClient('ws://localhost:' + port);


class Driver {
    constructor() {
        this.currentOrder = undefined;
        this.socket = socket;
    }
    connect() {
        // this.socket.connect(port, '127.0.0.1', () => {
        //     console.log('driver connected');
        // })
       this.socket.on('data', data => {
            const message = JSON.parse(data.toString());
            if(message.event === 'pickup') {
                setTimeout(() => {
                    this.pickup(message.payload);
                }, 1000);
            }
        })
    }
    pickup(order) {
        this.currentOrder = order;
        console.log(`driver picked up order ${order.id}`);
        const message = {
            "event": 'in-transit',
            "payload": order
        }
        this.socket.write(JSON.stringify(message));
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
driver.connect();