'use strict';
/*
 Application is intended to be run by delivery drivers in their vehicles. 
 Anytime a package is ready for pickup, they would get a notification.
- Connect to the CAPS server
- Listen for the data event coming in from the CAPS server
    - When data arrives, parse it (it should be JSON) and look for the event property and begin processing…
    - If the event is called pickup
        - Simulate picking up the package
        -Wait 1 second
        - Log “picking up id” to the console
        - Create a message object with the following keys:
             event - ‘in-transit’
            payload - the payload from the data object you just received
     - Write that message (as a string) to the CAPS server

- Simulate delivering the package
    Wait 3 seconds
    Create a message object with the following keys:
       event - ‘delivered’
       payload - the payload from the data object you just received
       Write that message (as a string) to the CAPS server
       */
const net = require('net');
require('dotenv').config();
const port = process.env.PORT;

class Driver {
    constructor() {
        this.currentOrder = undefined;
        this.socket = new net.Socket();
    }
    connect() {
        this.socket.connect(port, '127.0.0.1', () => {
            console.log('driver connected');
        })
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