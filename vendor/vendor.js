'use strict';

const faker = require('faker');
require('dotenv').config();
const port = process.env.PORT;
const storeName = process.env.STORE_NAME;
const ioClient = require('socket.io-client');

class Vendor {
    constructor() {
        this.id = 1;
        this.socket = ioClient(`ws://localhost:${port}`);
    }
    connect() {
        // this method is my vendor class calling the server to connect
        // Inside my callback is what tells me the server has accepted the connection
        // The two will stay connected until either one ends the connection
        // As long as they are connected, they can send and receive data
        this.socket.on('connection', () => {
            console.log('vendor connected!', storeName);
            socket.to(id).emit('join', storeName);
        })
       
        this.socket.on('data', data => {
            const message = JSON.parse(data.toString());
            if(message.event === 'delivered') {
                this.socket.emit('message', message);
            }
        })
    }
    generateOrder() {
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      let address = faker.address.city();
      let state = faker.address.state();
      const order = {
          "storeName": storeName,
          "id": this.id,
          "first_name": firstName,
          "last_name": lastName,
          "address": address,
          "state" : state
      };
      this.id++;
      let message = {
          "event": 'pickup',
          "payload": order
      }
      // I have data to send, I am connected, so send it!
      this.socket.emit(JSON.stringify(message));
    }
}

let client = new Vendor()
client.connect();
setInterval(() => {
    client.generateOrder() 
}, 5000);