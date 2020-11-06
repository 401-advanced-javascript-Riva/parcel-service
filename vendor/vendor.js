'use strict';

const faker = require('faker');
require('dotenv').config();
const port = process.env.PORT;
const storeName = process.env.STORE_NAME;
const ioClient = require('socket.io-client');

class Vendor {
    constructor() {
        this.id = 1;
        this.socket = ioClient(`ws://localhost:${port}/vendor`);
        this.message = {};
    }
    connect() {
        // this method is my vendor class calling the server to connect
        // Inside my callback is what tells me the server has accepted the connection
        // The two will stay connected until either one ends the connection
        // As long as they are connected, they can send and receive data
        this.socket.on('connect', () => {
            setInterval(() => {
                this.generateOrder();
                this.socket.emit('pickup', this.message);
            },5000)
        })
        this.socket.on('delivered', payload => {
            console.log(`thank you driver for delivering order ${payload.payload.id}`);
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
      this.message = {
          "event": 'pickup',
          "payload": order
      }
    }
}

let client = new Vendor()
client.connect();