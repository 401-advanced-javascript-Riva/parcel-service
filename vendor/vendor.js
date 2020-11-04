'use strict';

/*
File intended to be for store owners: When package is ready,they will be send an event to the hub server 
- Use .env to set your store name
- Connect to the CAPS server
- Every 5 seconds, simulate a new customer order
    - Create an order object with your store name, order id, customer name, address
    - HINT: Have some fun by using the faker library to make up phony information
    - Create a message object with the following keys:
         event - ‘pickup’
        payload - the order object you created in the above step
    - Write that message (as a string) to the CAPS server
- Listen for the data event coming in from the CAPS server
    - When data arrives, parse it (it should be JSON) and look for the event property
    - If the event is called delivered
    - Log “thank you for delivering id” to the console
- Ignore any data that specifies a different event
*/
const faker = require('faker');
const net = require('net');
require('dotenv').config();
const port = process.env.PORT;
const storeName = process.env.STORE_NAME;

class Vendor {
    constructor() {
        this.id = 1;
        this.socket = new net.Socket();
    }
    connect() {
        // this method is my vendor class calling the server to connect
        // Inside my callback is what tells me the server has accepted the connection
        // The two will stay connected until either one ends the connection
        // As long as they are connected, they can send and receive data
        this.socket.connect(port, '127.0.0.1', () => {
            console.log('Vendor connected');
        })
        this.socket.on('data', data => {
            const message = JSON.parse(data.toString());
            if(message.event === 'delivered') {
                console.log('thank you!')
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
      client.socket.write(JSON.stringify(message));
    }
}

let client = new Vendor()
client.connect();
setInterval(() => {
    client.generateOrder() 
}, 5000);